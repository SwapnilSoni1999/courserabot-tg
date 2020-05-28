# Coursera Invite bot

### Instructions
1. Get cookies from coursera admin account.
    - Goto coursera and login.
    - Visit admin page where "Invite Learner" option is.
    - Open devtools
    - Goto networks tab and refresh page.
    - Copy cookies header from Requested section
    - set in `config.json`

    eg. of cookies.
    ```
    __204u=4230362915-1586431831291; __204r=; _ga=GA1.2.2028754878.1586431855; _gd_visitor=183cba05-8929-42b5-8690-0130b35bf584; _gd_svisitor=a0b31bb8c66100007c078f5e5a0000001e8f2100; __adroll_fpc=be4711370c99a1eb90a95526df64f86c-1586431877159; _fbp=fb.1.1586431878914.840274243; _hjid=7b6c226f-42f2-47cf-ad31-829e247f64bf; cpTouchHist_initial=%7B%22RC_First_Channel__c%22%3A%22UnpaidEarned%22%2C%22RC_First_Medium__c%22%3A%22Direct%22%7D; driftt_aid=74ef98d2-525a-49e8-a1eb-8d7a67f46873; _gauges_unique_year=1; _gauges_unique=1; _mkto_trk=id:748-MIV-116&token:_mch-coursera.org-1587535740833-25571; cpTouchHist_rolling=%7B%22RC_Acquisition_Channel__c%22%3A%22UnpaidEarned%22%2C%22RC_Acquisition_Mediu...007; _gid=GA1.2.121381203.1590308328; maId={"cid":"7510fa49a96438163eb5.....","sid":"5416bf4e-2521-4b1e-ade1-a7a3dee38a54","isSidSaved":true,"sessionStart":"..............
    ```

    ### NOTE
    You probbably need to change **xsrf-tokens** in `coursera.py` on [these lines](https://github.com/SwapnilSoni1999/courserabot-tg/blob/master/coursera.py#L34)
    - You can get them from networks tab (in headers)

2. Get your bot token from **BotFather**
    - place your bot token in `config.json`
    ### Important step:
    - change your chatId on [this line](https://github.com/SwapnilSoni1999/courserabot-tg/blob/master/bot.js#L11)

    this Will help you to keep track on enrollments

## Ban/Unban
You can use `/ban` and `/unban` to restrict user.

Command:
```
/ban <chatId>
```
eg. `/ban 134567`

To unban 
```
/unban <chatId>
```
eg. `/unban 134567`

NOTE: Only pass chatId (Number) else it will throw exceptions.

<hr>
&copy; Swapnil Soni (SwapnilSoni1999)

