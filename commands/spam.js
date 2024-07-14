const fs = require('fs');
const path = require('path');
const ayarlarPath = path.join(__dirname, '../ayarlar.json');
let ayarlar = require(ayarlarPath);
const { botSahibiID } = ayarlar;

module.exports = {
    name: 'spamayarla',
    description: 'Spam komutu için gönderilecek mesajı ve sayısını ayarlar.',
    execute(message, args) {
        try {
            if (message.author.id !== botSahibiID) {
                return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
            }

            const mesaj = args.slice(0, -1).join(' ');
            const mesajSayisi = parseInt(args[args.length - 1]);

            if (!mesaj || isNaN(mesajSayisi)) {
                return message.reply('Lütfen geçerli bir mesaj ve mesaj sayısı belirtin.');
            }

            ayarlar.spamMesaj = mesaj;
            ayarlar.spamMesajSayisi = mesajSayisi;

            fs.writeFileSync(ayarlarPath, JSON.stringify(ayarlar, null, 2));

            message.reply(`Spam komutu ayarlandı: Mesaj "${mesaj}", Mesaj sayısı ${mesajSayisi}`);
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
