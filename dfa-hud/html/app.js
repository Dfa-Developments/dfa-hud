// MONEY HUD

const moneyHud = Vue.createApp({
    data() {
        return {
            cash: 0,
            bloodmoney: 0,
            bank: 0,
            amount: 0,
            plus: false,
            minus: false,
            showCash: false,
            showBloodmoney: false,
            showBank: false,
            showUpdate: false
        }
    },
    destroyed() {
        window.removeEventListener('message', this.listener);
    },
    mounted() {
        this.listener = window.addEventListener('message', (event) => {
            switch (event.data.action) {
                case 'showconstant':
                    this.showConstant(event.data)
                    break;
                case 'update':
                    this.update(event.data)
                    break;
                case 'show':
                    this.showAccounts(event.data)
                    break;
            }
        });
    },
    methods: {
        // CONFIGURE YOUR CURRENCY HERE
        // https://www.w3schools.com/tags/ref_language_codes.asp LANGUAGE CODES
        // https://www.w3schools.com/tags/ref_country_codes.asp COUNTRY CODES
        formatMoney(value) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            return formatter.format(value);
        },
        showConstant(data) {
            this.showCash = true;
            this.showBloodmoney = true;
            this.showBank = true;
            this.cash = data.cash;
            this.bloodmoney = data.bloodmoney;
            this.bank = data.bank;
        },
        update(data) {
            this.showUpdate = true;
            this.amount = data.amount;
            this.bank = data.bank;
            this.bloodmoney = data.bloodmoney;
            this.cash = data.cash;
            this.minus = data.minus;
            this.plus = data.plus;
            if (data.type === 'cash') {
                if (data.minus) {
                    this.showCash = true;
                    this.minus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showCash = false, 2000)
                } else {
                    this.showCash = true;
                    this.plus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showCash = false, 2000)
                }
            }
            if (data.type === 'bloodmoney') {
                if (data.minus) {
                    this.showBloodmoney = true;
                    this.minus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showBloodmoney = false, 2000)
                } else {
                    this.showBloodmoney = true;
                    this.plus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showBloodmoney = false, 2000)
                }
            }
            if (data.type === 'bank') {
                if (data.minus) {
                    this.showBank = true;
                    this.minus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showBank = false, 2000)
                } else {
                    this.showBank = true;
                    this.plus = true;
                    setTimeout(() => this.showUpdate = false, 1000)
                    setTimeout(() => this.showBank = false, 2000)
                }
            }
        },
        showAccounts(data) {
            if (data.type === 'cash' && !this.showCash) {
                this.showCash = true;
                this.cash = data.cash;
                setTimeout(() => this.showCash = false, 3500);
            }
            else if (data.type === 'bloodmoney' && !this.showBloodmoney) {
                this.showBloodmoney = true;
                this.bloodmoney = data.bloodmoney;
                setTimeout(() => this.showBloodmoney = false, 3500);
            }
            else if (data.type === 'bank' && !this.showBank) {
                this.showBank = true;
                this.bank = data.bank;
                setTimeout(() => this.showBank = false, 3500);
            }
        }
    }
}).mount('#money-container')

// PLAYER HUD

const playerHud = {
    data() {
        return {
            health: 0,
            stamina: 0,
            armor: 0,
            hunger: 0,
            thirst: 0,
            cleanliness: 0,
            stress: 0,
            voice: 0,
            temp: 0,
            horsehealth: 0,
            horsestamina: 0,
            horseclean: 0,
            youhavemail: false,
            pvp: true,
            outlawstatus: true,
            show: false,
            talking: false,
            showVoice: true,
            showHealth: true,
            showStamina: true,
            showArmor: true,
            showHunger: true,
            showThirst: true,
            showCleanliness: true,
            showStress: true,
            showHorseStamina: false,
            showHorseHealth: false,
            showHorseClean: false,
            showHorseStaminaColor: "#a16600",
            showHorseHealthColor: "#a16600",
            showHorseCleanColor: "#a16600",
            showYouHaveMail: true,
            showPVP: true,
            talkingColor: "#FFFFFF",
            showTemp: true,
        }
    },
    destroyed() {
        window.removeEventListener('message', this.listener);
    },
    mounted() {
        this.listener = window.addEventListener('message', (event) => {
            if (event.data.action === 'hudtick') {
                this.hudTick(event.data);
            }
        });
    },
    methods: {
        hudTick(data) {
            this.show = data.show;
            this.health = data.health;
            this.stamina = parseInt(data.stamina);
            this.armor = data.armor;
            this.hunger = data.hunger;
            this.thirst = data.thirst;
            this.cleanliness = data.cleanliness;
            this.stress = data.stress;
            this.voice = data.voice;
            this.temp = data.temp;
            this.youhavemail = data.youhavemail;
            this.pvp = data.pvp;
            this.outlawstatus = data.outlawstatus;
            this.talking = data.talking;
            this.showHorseStamina = data.onHorse;
            this.showHorseHealth = data.onHorse;
            this.showHorseClean = data.onHorse;
            if (data.onHorse) {
                this.horsehealth = data.horsehealth;
                this.horsestamina = data.horsestamina;
                this.horseclean = data.horseclean;
            }
            if (data.health >= 100) {
                this.showHealth = false;
            } else {
                this.showHealth = true;
            }
            if (data.health <= 30 ) {
              this.showHealthColor = "#FF0000";
            } else {
                this.showHealthColor = "#FFF";
            }
            if (parseInt(data.stamina) >= 100) {
                this.showStamina = false;
            } else {
                this.showStamina = true;
            }
            if (parseInt(data.stamina) <= 30 ) {
              this.showStaminaColor = "#FF0000";
            } else {
                this.showStaminaColor = "#FFF";
            }
            if (data.hunger <= 30) {
                this.showHungerColor = "#FF0000";
            } else {
                this.showHungerColor = "#FFF";
            }
            if (data.thirst <= 30 ) {
                this.showThirstColor = "#FF0000";
            } else {
                this.showThirstColor = "#FFF";
            }
            if (data.cleanliness <= 30 ) {
                this.showCleanlinessColor = "#FF0000";
            } else {
                this.showCleanlinessColor = "#FFF";
            }
            if (data.armor <= 0) {
                this.showArmor = false;
            } else {
                this.showArmor = true;
            }
            if (data.hunger >= 100) {
                this.showHunger = false;
            } else {
                this.showHunger = true;
            }
            if (data.thirst >= 100) {
                this.showThirst = false;
            } else {
                this.showThirst = true;
            }
            if (data.cleanliness >= 100) {
                this.showCleanliness = false;
            } else {
                this.showCleanliness = true;
            }
            if (data.stress <= 0) {
                this.showStress = false;
            } else {
                this.showStress = true;
            }
            if (data.talking) {
                this.showVoice = true;
            } else {
                this.showVoice = false;
            }
            if (data.talking) {
                this.talkingColor = "#FF0000";
            } else {
                this.talkingColor = "#FFFFFF";
            }
            if (data.temp >= 0) {
                this.showTemp = true;
            } else {
                this.showTemp = true;
            }
            if (data.temp <= 30) {
                this.showTempColor = "#FDD021";
            } else {
                this.showTempColor = "#CFBCAE";
            }
            if (data.youhavemail) {
                this.showYouHaveMail = true;
            } else {
                this.showYouHaveMail = false;
            }
            if (data.youhavemail) {
                this.showYouHaveMailColor = "#FFD700";
            } else {
                this.showYouHaveMailColor = "#FFFFFF";
            }
            if (data.pvp) {
                this.showPVP = true;
            } else {
                this.showPVP = true;
            }
            if (data.pvp) {
                this.showPVPColor = "#FF0000";
            } else {
                this.showPVPColor = "#00FF00";
            }
            if (data.outlawstatus >= 100) {
                this.showoutlawstatus = true;
            } else {
                this.showoutlawstatus = false;
            }
            if (data.outlawstatus) {
                this.showOutLawColor = "#FF0000";
            } else {
                this.showOutLawColor = "#00FF00";
            }
        }
    }
}
const app = Vue.createApp(playerHud);
app.use(Quasar)
app.mount('#ui-container');
