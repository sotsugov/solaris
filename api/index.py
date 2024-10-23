import httpx
import os
from fastapi import FastAPI, HTTPException
from api.models.message import Message, Messages
from api.models.report import Report
from api.models.usage import UsageItem, UsageResponse
from api.utils.credits import calculate_credits


BASE_URL = os.environ.get("DATA_URL")

# Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")


@app.get("/api/messages/current-period", response_model=Messages)
async def get_current_period_messages():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/messages/current-period")
        # Raise an exception for HTTP errors
        response.raise_for_status()
        data = response.json()
        # Convert the received data to our Message model
        messages = [Message(**msg) for msg in data["messages"]]
    return Messages(messages=messages)


@app.get("/api/reports/{report_id}", response_model=Report)
async def get_report(report_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/reports/{report_id}")
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Report not found")
        response.raise_for_status()
        data = response.json()
        return Report(**data)


@app.get("/api/usage", response_model=UsageResponse)
async def get_usage():
    messages = (await get_current_period_messages()).messages
    usage = []

    async with httpx.AsyncClient():
        for message in messages:
            usage_item = UsageItem(
                message_id=message.id,
                timestamp=message.timestamp.isoformat(),
                credits_used=0,
            )

            if message.report_id:
                try:
                    report = await get_report(message.report_id)
                    usage_item.report_name = report.name
                    usage_item.credits_used = report.credit_cost
                except HTTPException:
                    # If report not found, fall back to text-based calculation
                    usage_item.credits_used = calculate_credits(message.text)[
                        "credits_used"
                    ]
            else:
                usage_item.credits_used = calculate_credits(message.text)[
                    "credits_used"
                ]

            usage.append(usage_item)

    return UsageResponse(usage=usage)
