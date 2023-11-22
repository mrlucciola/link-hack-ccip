# Contributing to the repo

## Flow

1. Start ticket:
   - Method 1:
     1. Navigate to [issues list](https://github.com/mrlucciola/link-hack-ccip/issues)
     1. (Optional) Filter by `assignee`
     1. Click to open ticket
     1. In `Projects` section on the right sidebar: click the `Status: ...` dropdown and select `In Progress` option
     1. If making a change to the repo (adding/changing files):
        1. Create branch through the Github interface - in `Development` section on the right sidebar within the issue view
        1. Checkout locally
           ```
           git fetch
           git checkout <###-name-of-issue-branch>
           ```
        1. (On Local) Commit and push changes
        1. (In Github) Open PR
        1. (In Github) Assign reviewer
        1. (In Discord #tickets channel) Send message alerting that ticket is in review and add link to PR
     1. If NOT making a change to the repo:
        1. Complete work described in ticket
        1. Change `Status` to `Done`
        1. Send message in `#tickets` channel that work is completed, with a link to the ticket
        1. At this point, the Github Issue/ticket may be closed - click `Close issue` button at the bottom of the ticket page
   - Method 2:
     1. Navigate to [project dashboard](https://github.com/users/mrlucciola/projects/6/views/2)
     1. Identify ticket in `Todo` column assigned to self
     1. Move ticket to `In Progress` column
     1. Navigate to issue view on Github
     1. Refer to instructions in above sections:
        - `If making a change to the repo (adding/changing files):`
        - `If NOT making a change to the repo:`

## Pushing PRs

All pushes to `origin` remote (hosted on Github) should be for feature branches **only**. Pushes to the `main` branch should be avoided, unless strictly necessary.

Before pushing, always rebase to the most current version of the `main` branch (`main/HEAD`) with commands:
```sh
# While on feature branch:
# Pull commits to `main` (from merging PRs) made after creating local feature branch
git pull --rebase origin main
# Push branch
git push
```

```sh
# `main` branch - when creating 
# -- (Commit A) -- (Commit B) -- HEAD

# feature branch
# -- (Commit A) -- (Commit B) -- (Commits on feature branch)

# `main` branch - after PR with `Commit C` is merged
# -- (Commit A) -- (Commit B) -- (Commit C) -- HEAD

# feature branch - after rebasing with below command
# -- (Commit A) -- (Commit B) -- (Commit C) -- (Commits on feature branch)
```