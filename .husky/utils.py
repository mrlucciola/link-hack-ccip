import re
from subprocess import check_output


def get_branch_name():
    branch_name = (
        check_output(["git", "branch", "--show-current"]).strip().decode("utf-8")
    )

    if branch_name == "":
        exit(0)

    return branch_name


def check_commit_issue_number(commit_msg_filepath):
    with open(commit_msg_filepath, "r") as f:
        lines = f.readlines()
        firstline = lines[0]
        has_issue_number = re.match("^\(\d{1,5}\)", firstline)

        if has_issue_number:
            f.close()
            exit(0)

        return has_issue_number


def get_branch_issue_number(branch_name):
    issue_number_match = re.match("^(\d{1,5})\-", branch_name)
    if issue_number_match == False:
        exit(0)

    branch_issue_number = issue_number_match.groups()[0]

    return branch_issue_number
