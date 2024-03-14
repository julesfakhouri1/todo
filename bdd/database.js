import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://toto:toto2@todo.xzdwdxq.mongodb.net/';

if (!MONGODB_URI) {
    throw new Error(
        'Veuillez ajouter l\'URL de votre base de données MongoDB dans le fichier d\'environnement.'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
