# `User Init` flow

```mermaid
---
title: User-init flow
---
flowchart LR
   user((User))
   init1[["`'Splash' View`"]]

   user -->|"`Opens extension`"| init1
   init1 -->|"`Animation`"| init2

   subgraph useApp
      direction TB
      init2[["`'Welcome' View`"]]
      init3[["`'Set Up Keys' View`"]]
      init2 -->|"`Click 'Get started' button`"| init3

      subgraph keysetup[Key Setup]
         genKeys["Generate keys"]
         addKeys["Add keys"]
         nameKeys["Name keys"]
      end

      init3 --> keysetup
      keysetup --> init3
   end

   init4[["`'Completed' View
   \+ transition to
   'Main' View`"]]

   init3 --->|"`Click 'Complete setup' button`"| init4
```

0. User opens extension
1. "Splash" view loads
1. "Welcome" view loads
   - Text welcoming the user
   - [Button] "Get started"
1. "Set Up Keys" view loads
   - [NavLeft-Button] Back arrow
   - [Modal] "What are keys" > "A key holds your accounts..." (high-level copy about what a key is)
   - [Button] "Generate new key"
     - This adds a key to the list of keys below
   - [List] Keys (generated and manually added)
     - [TextField] Enter key (secret phrase/byte-string/upload file containing key/connect to external device)
       - [Drawer] "(Optional) Name for key"
       - [Button] Remove key
   - [BottomNav]
     - [Button] Back
     - [Button] Confirm

# `User Init` components

```mermaid
---
title: User Init components
---
flowchart LR
   subgraph SplashView
      splashAnimation
   end
   splashAnimation -->|Wait| WelcomeView

   subgraph WelcomeView
      start[Get Started button]
   end
   start -->|Click| SetupKeysView

   subgraph SetupKeysView
      direction LR
      info[Info About Keys]
      subgraph GenerateKeyButton
      end
      subgraph StagedKeysList
         subgraph KeyForm
            subgraph KeyTextField
            end
            subgraph KeyAliasTextField
            end
            subgraph RemoveKeyButton
            end
         end
         subgraph AddKeyButton
         end
      end
      CompleteSetupButton

   end
   CompleteSetupButton -->|"`**Click**:
   *Activates when
   1+ key(s) in
   StagedKeysList*`"| CompleteView

   subgraph CompleteView
   end
```

# `User Init` state

```mermaid
---
title: User Init state
---
erDiagram
   USER {
      KEY[] keys
      %% CONTACT[] contacts
   }
   KEY {
      string privateKey
      string secretPhrase
      ADDRESS[] addresses
   }
   ADDRESS {
      number nonce
      string address
      string alias
   }

   USER ||--|{ KEY: ""
   KEY ||--|{ ADDRESS: ""

```
