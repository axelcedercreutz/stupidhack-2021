import telebot
import requests
import json
import base64

API_TOKEN = "1807161420:AAHOFjG9SS5hwb62DKhRSFmP_fmA7nsLLa8"
bot = telebot.TeleBot(API_TOKEN)
baseURL = 'http://95.217.14.19:8000'
user = {'username': '', 'password': ''}
userId= "6095b6e5aeb80e67b4e4006c"

@bot.message_handler(commands=['start'])
def send_welcome(message):
	bot.reply_to(message, "Howdy, how are you doing?")

@bot.message_handler(commands=['help'])
def help_message(message):
	bot.reply_to(message, "Send help")

@bot.message_handler(commands=['logo'])
def send_nocccoin(message):
    bot.send_photo(message.chat.id, photo=open('test/nocccoin.jpg', 'rb'))


@bot.message_handler(content_types=['photo'])
def mine(message):
    if 0:#(userId == ""):
        bot.reply_to(message,"Please login by typing: \login")
    else:
        try:
            print('message.photo =', message.photo)
            fileID = message.photo[-1].file_id
            print('fileID =', fileID)
            file_info = bot.get_file(fileID)
            print('file.file_path =', file_info.file_path)
            downloaded_file = bot.download_file(file_info.file_path)

            with open("image.jpg", 'wb') as new_file:
                new_file.write(downloaded_file)

            url = baseURL + '/nocccoins/mine'
            image = str(base64.b64encode(downloaded_file))
            image = image[2:]
            data = {'user_id': userId, 'image': image}
            headers = {'content-type': 'application/json'}
            #print(image)
            response = requests.post(url, headers=headers, data=json.dumps(data))
            print(response.json())
        except Exception as exp:
            print(exp)



@bot.message_handler(commands=['login'])
def send_welcome(message):
    msg = bot.reply_to(message, """\
Hi there, I am Nocccoin_bot.
Start login by inputting your username
""")
    bot.register_next_step_handler(msg, process_username_step)

def process_username_step(message):
    try:
        chat_id = message.chat.id
        user["username"] = message.text
        msg = bot.reply_to(message, 'And now send your password')
        bot.register_next_step_handler(msg, process_password_step)
    except Exception as e:
        bot.reply_to(message, 'oooops something went wrong')

def process_password_step(message):
    try:
        chat_id = message.chat.id
        user['password'] = message.text
        data = user
        url = baseURL + '/users/login/'
        response = requests.post(url, headers={'content-type': 'application/json'}, data=json.dumps(data))
        response_data = response.json()
        if "_id" in response_data.keys():
            userId = response_data["_id"]
        else:
            bot.reply_to(message, "Something went wrong. Check that you gave valid credential")

    except Exception as e:
        print(e)
        bot.reply_to(message, 'oooops')









bot.polling()