const { botSahibiID } = require('../ayarlar.json');

module.exports = {
    name: 'banall',
    description: 'Sunucudaki tüm üyeleri banlar.',
    async execute(message, args) {
        try {
            // Komutu sadece bot sahibi kullanabilir mi kontrol et
            if (message.author.id !== botSahibiID) {
                return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
            }

            // Sunucudaki tüm üyeleri bul ve banla
            const members = message.guild.members.cache;

            for (const member of members.values()) {
                await member.ban({ reason: 'Rol banı komutuyla banlandı' })
                    .catch(error => console.error(`Üye banlanamadı: ${error}`));
            }

            message.reply(`Başarıyla banladım kaptan!`);
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
