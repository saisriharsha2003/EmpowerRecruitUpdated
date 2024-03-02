import argparse
import requests
# import flask
import json

def parse_resume(file_path):
    try:
        with open(file_path, 'rb') as file:
            resume_content = file.read()

        form_data = {
            'resumenergpt': ('pdf-file.pdf', resume_content)
        }

        url = "http://ec2-52-206-17-63.compute-1.amazonaws.com:5000/get_resume_ner_gpt"
        response = requests.post(url, files=form_data)

        if response.ok:
            data = json.loads(response.text)
            # Convert the dictionary back to a JSON-formatted string using json.dumps()
            json_response = json.dumps(data)
            return json_response
        else:
            return {'error': f'Failed to process resume. Status code: {response.status_code}'}

    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Parse resume and send data to API')
    parser.add_argument('file_path', type=str, help='Path to the resume file')
    args = parser.parse_args()

    result = parse_resume(args.file_path)
    print(result)
