# munch
eat time

## Interaction Specs

QR Code Contents: `<menu-id>`

### User ←—→ Server

`GET /menu/<menu-id>`: Gets the menu

 * Returns JSON for menu
 * Format: TBD

`POST /order`: Places an order

 * Send JSON for order
 * Format: TBD
 * Receive JSON for order confirmation
 * Format: TBD

### Restaurant ←—→ Server

TBD
