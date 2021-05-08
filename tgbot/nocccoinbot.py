import telebot
import requests
import base64

API_TOKEN = "1807161420:AAHOFjG9SS5hwb62DKhRSFmP_fmA7nsLLa8"
bot = telebot.TeleBot(API_TOKEN)
baseURL = ''
user = {username = "", password = ""}
userId= ""

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
    if (userId == ""):
        bot.send("Please login")
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
            data = {'user_id': userId, 'image': downloaded_file}
            headers = {'content-type:': 'application/json'}
            response = requests.post(url,headers = headers, data = data)
            print(response)
        except:
        print("vituixmän")

@bot.message_handler(commands=['login'])
    def send_welcome(message):
        msg = bot.reply_to(message, """\
    Hi there, I am Example bot.
    Start login by inputting your username
    """)
        bot.register_next_step_handler(msg, process_name_step)


    def process_username_step(message):
        try:
            chat_id = message.chat.id
            user.username = message.text
            msg = bot.reply_to(message, 'And now send your password')
            bot.register_next_step_handler(msg, process_age_step)
        except Exception as e:
            bot.reply_to(message, 'oooops something went wrong')

    response = requests.post(baseURL)

    def process_password_step(message):
        try:
            chat_id = message.chat.id
            user.password = message.text
        except Exception as e:
            bot.reply_to(message, 'oooops')




bot.polling()