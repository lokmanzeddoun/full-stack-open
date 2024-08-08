import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
const client = new ApolloClient({
	uri: "http://localhost:4000",
	cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root")).render(
	<ApolloProvider client={client}>
		<Router>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Router>
	</ApolloProvider>
);
