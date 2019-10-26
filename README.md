# munch
eat time

## Interaction Specs

QR Code Contents: `<menu-id>`

### User ←—→ Server

`GET /menu/<menu-id>`: Gets the menu

Returns JSON for menu

```json
{ 
    "id": 123456,
    "sections": [
        {
            "section-name": "bbq",
            "foods": [
                {
                    "id": 654321,
                    "name": "Burger",
                    "price": 6.99,
                    "ingredients": [
                        "the hopes and dreams of a billion young asian children trying to get into harvard", "wheat"
                    ],
                    "description": "borger",
                    "image": lmaoianfigureitout
                },
            ]
        }
    ]
}

```

`POST /order`: Places an order

 * Send JSON for order
 * Format: TBD
 * Receive JSON for order confirmation
 * Format: TBD

### Restaurant ←—→ Server

#### Menu Format


