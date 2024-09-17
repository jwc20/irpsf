from fastapi import Depends, FastAPI, HTTPException, Query, Request, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from starlette.responses import RedirectResponse

import uvicorn

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")


# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


def is_partial_rendering(request: Request):
    if not request.headers.get("hx-request", None):
        raise HTTPException(
            status_code=status.HTTP_307_TEMPORARY_REDIRECT,
            headers={"Location": "/"},
        )

# @app.get("/")
# async def root():
#     return RedirectResponse(url="/lobby")


@app.get("/lobby", response_class=HTMLResponse)
async def get_items(request: Request, _=Depends(is_partial_rendering)):
    peer_ids = ["Peer1", "Peer2", "Peer3", "Peer4", "Peer5", "Peer6", "Peer7", "Peer8", "Peer9", "Peer10"]

    # TODO
    # lobby_list = []
    return templates.TemplateResponse("partials/peers.html", {"request": request, "peer_ids": peer_ids})





# @app.route("/lobby/{id}")
# async def lobby(r: Request, id: str):
#     return templates.TemplateResponse(request=r, name="index.html", context={"id": id})


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=42069, reload=True)
