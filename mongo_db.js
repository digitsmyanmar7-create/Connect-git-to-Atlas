const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Nay:123@gittoatlas1.bldclct.mongodb.net/";

async function createDatabase() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        
        // Specify your database name
        const dbName = "myNewDatabase2"; // This will be created automatically
        
        // Get database reference
        const database = client.db(dbName);
        
        // Create a collection (also created automatically)
        const collection = database.collection("users");
        
        // Insert data - THIS CREATES THE DATABASE!
        const result = await collection.insertOne({
            name: "First User",
            email: "user@example.com",
            created: new Date()
        });
        
        console.log(`✅ Database '${dbName}' created automatically!`);
        console.log(`📝 Inserted document ID: ${result.insertedId}`);
        
        // Verify database exists
        const adminDb = client.db().admin();
        const databases = await adminDb.listDatabases();
        const exists = databases.databases.some(db => db.name === dbName);
        
        if (exists) {
            console.log(`🎯 Database '${dbName}' confirmed in cluster`);
        }
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

createDatabase();