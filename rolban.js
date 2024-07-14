const { botSahibiID } = require('../ayarlar.json');

module.exports = {
    name: 'rolban',
    description: 'Seçilen role sahip herkesi banlar.',
    async execute(message, args) {
        try {
            // Komutu sadece bot sahibi kullanabilir mi kontrol et
            if (message.author.id !== botSahibiID) {
                return message.reply('Bu komutu kullanmak için bot sahibi olmalısınız.');
            }

            // Role ismini argümanlardan al
            const roleName = args.join(' ');
            if (!roleName) {
                return message.reply('Lütfen geçerli bir rol ismi belirtin.');
            }

            // Rolü bul
            const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
            if (!role) {
                console.log(`Rol bulunamadı: ${roleName}`);
                return message.reply('Belirtilen rol bulunamadı.');
            }

            // Role sahip olan üyeleri bul ve banla
            const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));

            if (membersWithRole.size === 0) {
                return message.reply('Bu role sahip hiçbir üye bulunamadı.');
            }

            for (const member of membersWithRole.values()) {
                await member.ban({ reason: 'Rol banı komutuyla banlandı' })
                    .catch(error => console.error(`Üye banlanamadı: ${error}`));
            }

            message.reply(`${membersWithRole.size} üye başarıyla banlandı.`);
        } catch (error) {
            console.error('Hata oluştu:', error);
            message.reply('Bir hata oluştu, işlem gerçekleştirilemedi.');
        }
    },
};
