import telebot

API_TOKEN = "1807161420:AAHOFjG9SS5hwb62DKhRSFmP_fmA7nsLLa8"
bot = telebot.TeleBot(API_TOKEN)

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
def photo(message):
    print('message.photo =', message.photo)
    fileID = message.photo[-1].file_id
    print('fileID =', fileID)
    file_info = bot.get_file(fileID)
    print('file.file_path =', file_info.file_path)
    downloaded_file = bot.download_file(file_info.file_path)
    with open("image.jpg", 'wb') as new_file:
        new_file.write(downloaded_file)




bot.polling()