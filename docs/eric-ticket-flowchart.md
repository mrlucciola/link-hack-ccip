```mermaid
graph TD
    A[User] --> B[Metamask or any wallet that houses Decentrailied ID - maybe in the future  we can use DECO?]
    B --> C[2FA with Face ID or fingerprint, tied to a phone for example]
    C --> D[Proceed to enter Ticket purchase or raffle]
    C --> E[Deny if no 2fa or is a bot]
    D --> F[Ticket marketplace, Ticketmaster or blockchain that holds ticket NFTs]
    F --> G[Chainlink VRF]
    G --> H[User receives VRF to enter raffle or confirmation that they can buy the ticket]
    H --> I[user receives their token or NFT that represents the ticket]
    I --> J[User with ticket in their Web 3 wallet]
    K[User with ticket in their Web 3 wallet] --> L[user wants to sell or trade their ticket to another user another blockchain/ticket marketplace]
L --> M[Chainlink CCIP connect to another blockchain/ticket marketplace]
M -->N[user sells or swaps ticket to another user]
