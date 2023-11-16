#Democratization of blockchain RNG via Chanlink_VRF and CCIP

flowchart TD
    A[Lottery initiator on the DAPP's Chain] -->|Connected via metamask| B[DAPP]
    B --> C(Choose the lottery rules)
    C -->|Contract Call with fee + optional Tokens| D[Contract]
    D -->|Ask RNG| E[ChainLink VRF]
    E -->|RNG Response| D
    D -->|Contract created with factory| G       
    F[Lottery Participant] -->|registration via CCIP|G[Lottery Contract]
    G -->|Ask RNG| E
    E -->|RNG Response| G
    D --> H{Emit an Event/Proof}
    G --> H
    G --> |transfer of funds to winner via CCIP| F
