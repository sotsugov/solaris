from fastapi import FastAPI


# Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


@app.get("/api/v1/hello")
def hello_fast_api():
    return {"message": "Hello from api"}
