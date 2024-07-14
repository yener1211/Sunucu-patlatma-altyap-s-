const { prefix, botSahibiID } = require('../ayarlar.json');

module.exports = {
    name: 'panel',
    description: 'Tüm komutları listeler ve kullanıcıya DM olarak gönderir.',
    execute(message, args) {
        // Komutu sadece bot sahibi kullanabilir mi kontrol et
        if (message.author.id !== botSahibiID) {
            return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
        }

        const data = [];
        const { commands } = message.client;

        // Komutları listele
        data.push('**Komut Listesi:**');
        commands.forEach(command => {
            data.push(`**${prefix}${command.name}**: ${command.description}`);
        data.push('**Geliştirilmeye devam ediliyor**');
        });

        // Kullanıcıya DM olarak gönder
        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('Komutları DM olarak gönderdim!').then(msg => {
                    // !panel komutunun mesajını sil
                    msg.delete({ timeout: 2500 }); // 2.5 saniye sonra sil
                });
            })
            .catch(error => {
                console.error(`DM gönderirken hata oluştu: ${error}`);
                message.reply('Komutları DM olarak gönderemedim, lütfen DM kanalını kontrol edin.');
            });

        // Kullanıcının !panel komutunu sil
        message.delete({ timeout: 5000 }) // 5 saniye sonra sil
            .catch(err => console.log('Komut silinemedi:', err));
    },
};
