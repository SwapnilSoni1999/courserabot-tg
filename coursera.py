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
		'cookie': '__204u=4230362915-1586431831291; __204r=; _ga=GA1.2.2028754878.1586431855; _gd_visitor=183cba05-8929-42b5-8690-0130b35bf584; _gd_svisitor=a0b31bb8c66100007c078f5e5a0000001e8f2100; __adroll_fpc=be4711370c99a1eb90a95526df64f86c-1586431877159; _fbp=fb.1.1586431878914.840274243; _hjid=7b6c226f-42f2-47cf-ad31-829e247f64bf; cpTouchHist_initial=%7B%22RC_First_Channel__c%22%3A%22UnpaidEarned%22%2C%22RC_First_Medium__c%22%3A%22Direct%22%7D; driftt_aid=74ef98d2-525a-49e8-a1eb-8d7a67f46873; _gauges_unique_year=1; _gauges_unique=1; _mkto_trk=id:748-MIV-116&token:_mch-coursera.org-1587535740833-25571; cpTouchHist_rolling=%7B%22RC_Acquisition_Channel__c%22%3A%22UnpaidEarned%22%2C%22RC_Acquisition_Medium__c%22%3A%22Referral%22%2C%22RC_Acquisition_Source_Detail__c%22%3A%22https%253A%252F%252Fwww.coursera.org%252Fbusiness%22%7D; cpTouchHist_recent=%7B%22RC_Recent_Channel__c%22%3A%22UnpaidEarned%22%2C%22RC_Recent_Medium__c%22%3A%22Referral%22%2C%22RC_Recent_Source_Detail__c%22%3A%22https%253A%252F%252Fwww.coursera.org%252Fbusiness%22%7D; trwv.uid=coursera-1587535729955-c819bef9%3A1; __ar_v4=EFLOYRV5JRB3ZIZXJZ5MP7%3A20200509%3A8%7C7VNBYGWF3BE5DKOOGWWP2Z%3A20200509%3A8%7CAMNEINFG7NFARPVLM7GV2K%3A20200509%3A8; DFTT_END_USER_PREV_BOOTSTRAPPED=true; CSRF3-Token=1590694295.IjcTlnKXfQO4wVAX; __400v=5127fdb0-5dcc-42cf-ccf8-831f352c7007; _gid=GA1.2.121381203.1590308328; maId={"cid":"7510fa49a96438163eb59838c719b855","sid":"5416bf4e-2521-4b1e-ade1-a7a3dee38a54","isSidSaved":true,"sessionStart":"2020-05-24T08:18:47.000Z"}; CAUTH=rgocMgLDTth9TOYww2hNMudRQiO4Xn_cSP0_EUxg3SqU231jUK-CWl-WqjBszBKV9dXLOzD2-HsT7oIvZduGiw.3_84lCfVc_RJzxyIkkfGaA._o_iw1lWc0iNkmh-bBkt2umAZF6A11TP8c-xUoiyxnFKAQRRjHCKCYBigIDM48pFH2To9c5aSUlvqBEsffKBuZAEN4BKqVp6U7RT9UzdBFUsp_L0vBi3Bzc3bCckGXpJPK8cdhJkKz2yh7_GEjp0GLByZ0sffl1Cum3UUHr7GIby5UuMz0skLk0qX-PZWXMr; program-home-hideAlternativeEmailModal-34820400=1; _uetsid=fa540591-fc55-2fdf-84fa-66982afaa578; _tq_id.TV-63455409-1.39ed=d7f79da143aad85d.1586431870.0.1590308355..; stc113717=env:1590308327%7C20200624081847%7C20200524084914%7C2%7C1030880:20210524081914|uid:1586431867747.1191733135.9122114.113717.63564953.9:20210524081914|srchist:1030880%3A1589396144%3A20200613185544%7C1030881%3A1589447401%3A20200614091001%7C1030880%3A1590308327%3A20200624081847:20210524081914|tsa:1590308327826.232024706.52948046.16854531739325762:20200524084914; fs_uid=rs.fullstory.com#ARGC0#4762636338348032:5280386721660928#98ec4fe8#/1619635983; driftt_sid=327ccbef-779e-4793-93eb-a2de038beb49; __d_mkto=true; __400vt=1590308376806; csrftoken=debij2WvhoXpw4pjz2j3sTic; csrf2_token_cV7ZO4gj=L7O57ZhWeLaVphdcZ4AVcQJ6',
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