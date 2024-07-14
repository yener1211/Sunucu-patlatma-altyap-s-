const fs = require('fs');
const path = require('path');
const ayarlarPath = path.join(__dirname, '../ayarlar.json');
let ayarlar = require(ayarlarPath);
const { botSahibiID } = ayarlar;

module.exports = {
    name: 'boomayarla',
    description: 'Boom komutu için kanal ismi ve kanal sayısını ayarlar.',
    execute(message, args) {
        try {
            if (message.author.id !== botSahibiID) {
                return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
            }

            const kanalIsmi = args[0];
            const kanalSayisi = parseInt(args[1]);

            if (!kanalIsmi || isNaN(kanalSayisi)) {
                return message.reply('Lütfen geçerli bir kanal ismi ve kanal sayısı belirtin.');
            }

            ayarlar.boomKanalIsmi = kanalIsmi;
            ayarlar.boomKanalSayisi = kanalSayisi;

            fs.writeFileSync(ayarlarPath, JSON.stringify(ayarlar, null, 2));

            message.reply(`Boom komutu ayarlandı: Kanal ismi "${kanalIsmi}", Kanal sayısı ${kanalSayisi}`);
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
