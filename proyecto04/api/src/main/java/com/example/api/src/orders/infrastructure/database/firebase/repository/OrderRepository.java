package com.example.api.src.orders.infrastructure.database.firebase.repository;

import com.example.api.shared.OrderMapper;
import com.example.api.src.orders.application.out.IOrderRepository;
import com.example.api.src.orders.domain.Order;
import com.example.api.src.orders.infrastructure.database.entitites.OrderDB;
import com.example.api.src.orders.infrastructure.database.firebase.init.FirebaseInit;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository implements IOrderRepository {

  @Autowired
  private FirebaseInit firebaseInit;
  @Autowired
  private OrderMapper orderMapper;

  public List<Order> findAllByCustomerId(Integer id, String state) throws InterruptedException {

    CountDownLatch done = new CountDownLatch(1);
    List<Order> orders = new ArrayList<>();

    FirebaseDatabase firebaseDatabase = firebaseInit.firebaseDatabase();

    Query reference = firebaseDatabase.getReference("/orders").orderByChild("customerNumber")
        .equalTo(id.toString());

    reference.addValueEventListener(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        try {
          for (DataSnapshot dataSnapshot1 : dataSnapshot.getChildren()) {
            orders.add(orderMapper.orderDBToOrder(dataSnapshot1.getValue(OrderDB.class)));
          }
        } catch (Exception e) {
          System.out.println(e);
        } finally {
          done.countDown();
        }
      }

      @Override
      public void onCancelled(DatabaseError databaseError) {
        done.countDown();
      }
    });
    done.await();
    return orders;
  }

  ;

}
