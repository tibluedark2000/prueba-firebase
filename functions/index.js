const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.resetP = functions.pubsub.schedule("20 of every month 00:00").onRun(async (context) => {
  try {
    const usersRef = db.collection("usuarios");
    const snapshot = await usersRef.get();

    const batch = db.batch(); // Para realizar actualizaciones masivas

    snapshot.forEach((doc) => {
      const userData = doc.data();
      const resetData = {
        puntos_derecho: 0,
        puntos_izquierdo: 0,
        puntos_derecho_restantes: 0,
        puntos_izquierdo_restantes: 0,
        tramo_derecho: userData.tramo_derecho.map((tramo) => ({...tramo, puntos: 0})),
        tramo_izquierdo: userData.tramo_izquierdo.map((tramo) => ({...tramo, puntos: 0})),
      };

      batch.update(usersRef.doc(doc.id), resetData);
    });

    await batch.commit(); // Ejecuta todas las actualizaciones
    console.log("Todos los puntos han sido reseteados exitosamente.");
  } catch (error) {
    console.error("Error reseteando los puntos: ", error);
  }
});
