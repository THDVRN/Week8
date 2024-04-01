//Creating a class for anime with the inputs of title and animation studio
class Anime {
    constructor(title, studio) {
        this.title = title
        this.studio = studio
    }
}

//Creating a class for anime season with an input for name and an open array for anime to be added to
class AnimeSeason {
    constructor(name) {
        this.name = name;
        this.animes = [];
    }
}

//Creating a class for the menu. It will be constructed with an array for added seasons and it has selector for seasons with an initial null value
class Menu {
    constructor() {
        this.seasons = [];
        this.selectedSeason = null;
    }

    //Start function is what will start the menu application. Main Menu options are defined later but the start function will allow you to access the methods for each
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch(selection) {
                case '1' :
                    this.createSeason();
                    break;
                case '2' :
                    this.viewSeason();
                    break;
                case '3' :
                    this.deleteSeason();
                    break;
                case '4' :
                    this.displaySeasons();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye');
    }

    //The main menu method is now defined as a prompt which will display the options for the start method
    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create new Season
        2) View Season
        3) Delete Season
        4) Display all Seasons
        `);
    }

    //This will show a prompt for menu options when selecting view teams as defined later. The prompt will also display the info for the currently selected Season
    showSeasonMenuOptions(seasonInfo) {
        return prompt(`
        0) Back
        1) Add Anime
        2) Delete Anime
        -----------------
        ${seasonInfo}
        `);
    }

    //Defining the display seasons method for the menu option 4. This uses a loop to create a numbered list of each created season and displays as an alert
    displaySeasons() {
        let seasonString = '';
        for (let i = 0; i < this.seasons.length; i++) {
            seasonString += i+ ') ' + this.seasons[i].name + '\n';
        }
        alert(seasonString)
    }

    //Defining the create season method. Will prompt you for a seson name and create a new season with properties form the Anime Season class and push to the seasons list in the menu
    createSeason() {
        let name = prompt(`Enter Season here`)
        this.seasons.push(new AnimeSeason(name))
    }

    //Defining the view season method. Will prompt you to select a season via index number. Will then display the season menu options with a list of the anime added for that season.
    //Season menu options give the options to create or delete anime for the selected season
    viewSeason() {
        let index = prompt('Enter the index of the season you want to view');
        if (index > -1 && index < this.seasons.length) {
            this.selectedSeason = this.seasons[index];
            let description = `Season: ` + this.selectedSeason.name + '\n';

            for (let i = 0; i < this.selectedSeason.animes.length; i++) {
                description += i + ') ' + this.selectedSeason.animes[i].title + ` from ` + this.selectedSeason.animes[i].studio + '\n';
            }

            let selection = this.showSeasonMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.createAnime();
                    break;
                case '2' :
                    this.deleteAnime();
            }
        }
    }

    //Defines the delete season method. Prompts you to select a season via index number. Will then remove that season via the splice command
    deleteSeason () {
        let index = prompt(`Enter the index of the season you want to delete: `);
        if (index > -1 && index < this.seasons.length) {
            this.seasons.splice(index, 1);
        }
    }

    //Defines the create anime method. Will prompt you to enter the anime title & animation studio, and will push to the anime array for the selected season
    createAnime() {
        let title = prompt(`Enter anime title`);
        let studio = prompt('Enter anime studio');
        this.selectedSeason.addAnime(new Anime(title, studio));
    }

    //Defines the delete anime method. Will prompt you to select an anime via index number and will remove it from the anime list via splice
    deleteAnime() {
        let index = prompt('Enter the index of the anime you would like to delete');
        if (index > -1 && index < this.selectedSeason.animes.length) {
            this.selectedSeason.animes.splice(index, 1);
        }
    }
}

//Creating a new menu
let menu = new Menu();

//Starting the menu via the start method under the menu class
menu.start()