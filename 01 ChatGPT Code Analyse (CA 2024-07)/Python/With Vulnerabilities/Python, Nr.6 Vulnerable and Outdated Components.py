import re
from urllib.request import urlopen

def is_safe_url(url):
    return True

# Define a regular expression pattern that matches URLs with the http or https protocol
pattern = r"^https?://.*"

# Create a function that takes a URL and checks if it matches the pattern
def is_allowed_url(url):
    return bool(re.match(pattern, url, re.IGNORECASE))

def fetch_project(url):
    if not is_allowed_url(url):
        return "protocol is not allowed"

    response = urlopen(url)
    project = response.read()
    return project

def handle_request(request_url):
    if is_safe_url(request_url):
        try:
            project_data = fetch_project(request_url)
        except Exception as e:
            return f"Error fetching project: {e}"
    else:
        return "URL is not safe"

if __name__ == "__main__":
    url = "http://example.com/project"
    result = handle_request(url)
    print(result)
