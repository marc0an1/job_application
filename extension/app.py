from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

# Configure CORS to allow all origins and headers
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/scrape', methods=['POST'])
def scrape_job_application():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "Unauthorized"}), 401

    print("Authorization Header:", request.headers.get("Authorization"))
    print("Request Data:", request.json)


    scraped_data = request.json
    if not scraped_data:
        return jsonify({"error": "Invalid data"}), 400

    formatted_data = scrape_job_application_logic(scraped_data)

    response = post_to_spring_backend(formatted_data, auth_header)

    if response.status_code == 200:
        return jsonify({"message": "Job application scraped and saved successfully!"}), 200
    else:
        try:
            error_message = response.json().get("error", "Failed to save job application")
        except ValueError:
            error_message = "Failed to save job application (Invalid JSON response from Spring backend)"
        return jsonify({"error": error_message}), response.status_code

def scrape_job_application_logic(received_data):
    company_name = received_data.get("companyName", "Unknown Company")
    job_description = received_data.get("jobTitle", "Unknown Job Title")
    date_applied = received_data.get("dateApplied", "2024-01-01")
    status = received_data.get("status", "Applied")
    notes = received_data.get("notes", "")
    return {
        "companyName": company_name,
        "jobDescription": job_description,
        "dateApplied": date_applied,
        "status": status,
        "notes": notes
    }

def post_to_spring_backend(data, auth_header):
    spring_url = "http://localhost:8081/jobApplication/createJobApplication"
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json"
    }
    response = requests.post(spring_url, json=data, headers=headers)
    print("Spring Backend Response:", response.status_code, response.text)
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)
