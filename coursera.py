import requests
import json
import argparse

cookies = json.load(open('config.json', 'r'))['COOKIES']

def invite(email, name):
	data = {
		"invitee": {
			"email": email,
			"externalUserData": {
				"definition": {
					"fullName": name,
					"email": email,
					"externalId": ""
				},
				"typeName": "genericExternalUserData"
			},
			"name": name
		},
		"programId": "kYz_13PQEeqXVxIF8JfnBQ",
		"roasterId": "y4yxmzIZQguZ7LgUDM2W8Q"
	}

	headers = {
		'cookie': cookies,
		'x-requested-with': 'XMLHttpRequest',
		"origin": "https://www.coursera.org",
		"content-type": "application/json; charset=UTF-8",
		"content-length": str(len(json.dumps(data))),
		"x-coursera-version": "847f9e06eca90746c67db4b40ae0e9795cd6db56",
		"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
		"accept-encoding": "gzip, deflate, br",
		"x-csrf2-cookie": "csrf2_token_cV7ZO4gj",
		"x-csrf2-token": "L7O57ZhWeLaVphdcZ4AVcQJ6",
		"x-csrf3-token": "1590694295.IjcTlnKXfQO4wVAX",
		"x-csrftoken": "debij2WvhoXpw4pjz2j3sTic"
	}

	# print("Sending first request")
	response = requests.post("https://www.coursera.org/api/programInvitations.v1", headers=headers, json=data)
	# print(response.text)
	# open('kek.html', 'w').write(response.text)
	# print(response)
	# print("first response", response.json())

	res_data = response.json()
	try:
		payload = { 'id': res_data['elements'][0]['id'], 'action': 'send', 'programId': 'kYz_13PQEeqXVxIF8JfnBQ' }

		# print("Performing 2nd request")
		# print("Payload:", payload)

		res2 = requests.post("https://www.coursera.org/api/programInvitations.v1", params=payload, data='{}', headers=headers)
		# print("second response", res2.json())
		return res2.json()
	except:
		# print(res_data)
		return res_data
		

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument('--email', required=True)
	parser.add_argument('--name', required=True)

	args = parser.parse_args()
	email = args.email
	name = args.name

	# print("Inviting to Coursera...")
	res = invite(email, name)
	print(json.dumps(res))