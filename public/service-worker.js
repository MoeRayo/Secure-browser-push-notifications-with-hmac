// public/service-worker.js
self.addEventListener("install", (event) => {
	console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker activated.");
});

self.addEventListener("push", function (event) {
	console.log("Push message received:", event.data.text());

	const options = {
		body: event.data.text(),
		// icon: "/icon.png", // You can add an icon.png to your public folder
		// badge: "/badge.png", // You can add a badge.png to your public folder
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: "1",
		},
		actions: [
			{
				action: "explore",
				title: "View Details",
			},
		],
	};

	event.waitUntil(
		self.registration
			.showNotification("Push Notification", options)
			.then(() => {
				console.log("Notification shown successfully");
			})
			.catch((error) => {
				console.error("Error showing notification:", error);
			})
	);
});

self.addEventListener("notificationclick", function (event) {
	console.log("Notification click received.");
	event.notification.close();
});
