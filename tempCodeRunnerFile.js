const { MongoClient } = require('mongodb');

// Your Atlas connection string
const uri = "mongodb+srv://Nay:123@gittoatlas1.bldclct.mongodb.net/test?retryWrites=true&w=majority";

async function main() {
    const client = new MongoClient(uri, {
        // Add these SSL options
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false,
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    
    try {
        console.log("Connecting to MongoDB Atlas...");
        await client.connect();
        console.log("✅ Connected successfully!");
        
        // Test the connection
        const db = client.db();
        await db.command({ ping: 1 });
        console.log("🗺️ Database ping successful!");
        
        // List databases
        const adminDb = client.db().admin();
        const dbs = await adminDb.listDatabases();
        console.log(`📊 Found ${dbs.databases.length} database(s)`);
        
    } catch (error) {
        console.log("❌ Connection failed!");
        console.log("Error details:", error.message);
        
        // Check common issues
        if (error.message.includes('SSL')) {
            console.log("\n🔧 SSL Issue detected. Try these fixes:");
            console.log("1. Make sure you have the latest Node.js version");
            console.log("2. Try alternative SSL configuration below");
        }
        
    } finally {
        await client.close();
        console.log("🔌 Connection closed");
    }
}

main();