const errorMessage = (message) => {
	return `
    <section id="error" class="  bg-danger">
	    <h3 class="error_message">${message}</h3>
    </section>
    `;
};

export default errorMessage;
