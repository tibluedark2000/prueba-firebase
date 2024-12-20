const admin = require("firebase-admin");

// Inicializa Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

async function resetPoints() {
    const usuariosRef = db.collection("usuarios");
    const snapshot = await usuariosRef.get();

    const batch = db.batch();

    snapshot.forEach((doc) => {
        const userData = doc.data();
        const resetData = {
            puntos_derecho: 0,
            puntos_izquierdo: 0,
            puntos_derecho_restantes: 0,
            puntos_izquierdo_restantes: 0,
        };
        // Solo actualizar tramo_derecho si tiene al menos un elemento
        if (userData.tramo_derecho && userData.tramo_derecho.length > 0) {
            resetData.tramo_derecho = userData.tramo_derecho.map((tramo) => ({ ...tramo, puntos: 0 }));
        }

        // Solo actualizar tramo_izquierdo si tiene al menos un elemento
        if (userData.tramo_izquierdo && userData.tramo_izquierdo.length > 0) {
            resetData.tramo_izquierdo = userData.tramo_izquierdo.map((tramo) => ({ ...tramo, puntos: 0 }));
        }

        batch.update(usuariosRef.doc(doc.id), resetData);
    });

    await batch.commit();
    console.log("Puntos reseteados correctamente.");
}

resetPoints().catch(console.error);
