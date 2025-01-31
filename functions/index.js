/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.updateUserByAdmin = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Kimlik doğrulaması gereklidir."
    );
  }

  const user = await admin.auth().getUser(context.auth.uid);
  if (user.customClaims?.role !== "admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Bu işlemi sadece admin kullanıcıları gerçekleştirebilir."
    );
  }

  const { userId, email, password, role, name, contactNumber, company } = data;

  try {
    await admin.auth().updateUser(userId, {
      email: email || undefined,
      password: password || undefined,
    });

    const collectionName = role === "customer" ? "customers" : "users";
    await admin.firestore().collection(collectionName).doc(userId).set(
      {
        name,
        email,
        contactNumber,
        company: company || "",
        role,
      },
      { merge: true }
    );

    return { success: true, message: "Kullanıcı başarıyla güncellendi." };
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Güncelleme başarısız oldu.", error);
  }
});
