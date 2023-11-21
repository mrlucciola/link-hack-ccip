# Features for app

1. Initialize View

   1. Intro view with text
   1. Set keys:
      - Add existing key
      - Generate key
      - Assign alias/name to key
      - Remove key
      - (tooltip) Info/VUI about keys

1. Home View

   - Settings
     - User settings
       - Add contacts
       - Add address
       - Assign/reassign name/alias to address
       - Keys
         - Add key
         - Remove key
         - Rename key
         - Set default key
         - VUI/info about keys
     - App settings
       - Add/remove/prioritize RPCs
   - [Button] Create new txn (ref: **New Txn View**)
   - Txn History Tab (ref: **Txn History View**)
   - User Dashboard
     - Assets
       - Sort by: Tokens, balances, chains, accounts
         - Accounts > value (API call)
     - Analytics

1. New Txn View

   1. Build Txn View
      - Add address
        - (Drawer) **Src**
          - Advanced view
        - (Drawer) **Dst**
          - Address entry fields
            - Add address, chain, token, value/token amount
              - API/external: Look up token amount
            - API: ID if empty account, EOA, contract
              - API: if contract, look up common name
            - If EOA, Look up associated contact
            - Advanced view
      - Save txn as draft
   1. Review Txn View
      - Show src address(es)
        - Chain, address, assets, amount
        - Address type for all addresses (EOA/contract/factory and common name, if any)
      - Show dst address(es)
        - Chain, address, assets, amount, associated contact
        - Address type for all addresses (EOA/contract and common name, if any)
      - Show all network fees
      - Show list of expected txns
      - Show high-level tokens `from-src` and `to-dst`
      - Show estimated time to complete - total and listed for all txns
      - Button to show sankey graph of all addresses involved
      - Send txn warning modal
      - Send txn confirmation button

1. ## Txn History View
   1. All Sent Txns Tab
   1. Active/Incomplete Txns Tab
   1. Completed Txns Tab
