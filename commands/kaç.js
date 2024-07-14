const { botSahibiID } = require('../ayarlar.json');

module.exports = {
    name: 'kaç',
    description: 'Botun sunucudan ayrılmasını sağlar.',
    execute(message, args) {
        // Komutu sadece bot sahibi kullanabilir mi kontrol et
        if (message.author.id !== botSahibiID) {
            return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
        }

        try {
            // Botun bulunduğu sunucudan ayrıl
            message.guild.leave();

            // Kullanıcının !kaç komutunu sil
            message.delete({ timeout: 1000 }) // 5 saniye sonra sil
                .catch(err => console.log('Komut silinemedi:', err));
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, sunucudan ayrılamadım.');
        }
    },
};
