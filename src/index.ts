import { initialize } from "./app";

const start = async () => {
    const app = await initialize();
    const port = process.env.PORT || 8099;
    
    app.listen(port, () =>{
        console.log(`\n🚀!! server started on http://localhost:${port} !!`)
    })
}
start().catch(err => console.log(err));

