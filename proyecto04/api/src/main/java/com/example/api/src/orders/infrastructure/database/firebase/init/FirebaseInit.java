package com.example.api.src.orders.infrastructure.database.firebase.init;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.stereotype.Service;

@Service
public class FirebaseInit {

  @PostConstruct
  private void init() throws IOException {
    InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("firebase.json");
    FirebaseOptions options = new FirebaseOptions.Builder()
        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
        .setDatabaseUrl("https://proyecto04-dawn-default-rtdb.firebaseio.com")
        .build();
    if (FirebaseApp.getApps().isEmpty()) {
      FirebaseApp.initializeApp(options);
    }
  }

  public FirebaseDatabase firebaseDatabase() {
    return FirebaseDatabase.getInstance();
  }
}
