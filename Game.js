const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ROAD:  Symbol("road"),
    FORK: Symbol("fork"),
    CASTLE: Symbol("castle"),
    BELL: Symbol("bell"),
    DOOR: Symbol("door"),
    KEY: Symbol("key"),
    HOLD: Symbol("hold"),
    HOUSE: Symbol("house"),
    INHOUSE: Symbol("inhouse"),
    FORESTROAD: Symbol("forestroad"),
    QUIZ: Symbol("quiz"),
    QUIZ1:Symbol("quiz1",),
    QUIZ2: Symbol("quiz2"),
    QUIZ3: Symbol("quiz3"),
    QUIZ4: Symbol("quiz4"),
    QUIZ5: Symbol("quiz5"),
    PATH: Symbol("path"),
    CAVE: Symbol("cave"),
    CHECK: Symbol("check"),
    TOWN: Symbol("town")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.treasure=false;
        this.quiz=-1;
        this.cave=false;
        this.diamond=false;
    }

    makeAMove(sInput)
    {
        let cReply="";
        let sReply="";
        let tReply="";
        let qReply="";
        let dReply="";
        let bReturn=false;

        const welcomeReply = "You awake on a cold brick road.  You realize that you are clothed in rough linen and a wool cloak and a set of leather boots. Ahead of you the road leads to a fork.  Do you Wait or go to the Fork in the road?";
        const waitReply = "After 1 hour you start to feel cold as it begins to rain and a wolf howls nearby.  You realize that you should move on.";
        const forkReply="After wandering about you arrive at the fork in the road.  Do you take the Left fork to the castle or the Right fork to the dark forest";
        const townReply="You continue down the road through the forest.  Ahead of you the trees start to thin out and you can see the wooden stockade of a town.  You realize that the town is where you live.  Do you Enter the town or Continue past it?";
        const resetReply="As you continue along the road past the town, you feel a strange sense of deja vu.  Suddenly, you feel dizzy and then everything goes blank...  To play again, type anything...";
        const quizQ2="Here is the second question.  True or False.  In object oriented programming, a class is a template for creating objects that specifies data fields and methods.";
        const quizQ3="OK, another question.  On a mercator projection map for sailing, is the shortest sailing distance between 2 points described by a straight line or a curved line?";
        const quizQ4="How about this question.  When deleting a record from a relational database, which record must be deleted first - the record in the child table or the record in the parent table?"
        const quizQ5="Now for the final question.  In which year did the current Canadian flag make its first official appearance?"
        const exitHouse=" You exit the house, and continue up the road away from the fork. "
        const rightForkreply="The road slopes upward and curves to the right.  As you walk along the road it becomes increasingly slippery.  The road enters a dark forest with large trees reaching far into the sky.  Moss hangs down from the trees, and you can hear the sound of the wind rustling the branches and leaves.  You notice one massive  tree has a door in the base, and a small window where a lamp flickers.  Do you Enter the door, Continue on the road through the forest, or go back to the Fork?";
        const pathReply="The road winds deeper into the forest.  At one point you stop by a small path leading towards a large mound in the forest.  Do you follow the small Path or Continue on the road through the forest?";
        const homeReply="You open the door to your home and enter, closing the door behind you.  A fire burns in the large fireplace.  You sit down in the chair by the fireplace.  As you remove your boots, you reflect on your travels. "
        switch(this.stateCur){
            case GameState.WELCOMING:
            sReply = welcomeReply;
                this.stateCur = GameState.ROAD;
                break;
            case GameState.ROAD:
                if(sInput.toLowerCase().match("wait")){
                    sReply = waitReply+forkReply;
                    this.stateCur = GameState.FORK;
                }else if(sInput.toLowerCase().match("fork")){
                    sReply ="As you approach the fork, there is a sign on the left saying To Castle Torygg.  The sign on the right says To Dark Forest.  Do you take the Left or the Right fork?";
                    this.stateCur = GameState.FORK;
                }else{
                    sReply="You wander about for a while and eventually find yourself at the fork.  Do you take the Left or the Right fork?"
                    this.stateCur= GameState.FORK;
                }
                break;
            case GameState.FORK:
                if(sInput.toLowerCase().match("left")){
                    sReply = "You walk along the road that winds by fields planted with grain and a small stream.  The road crosses the stream at a rocky ford, and winds up a rocky barren hill to a ruined castle.  The large metal braced wooden gate to the castle is closed, but there is a silver bell near the gate, and a finely crafted silver hammer sitting nearby on a pedestal.  Do you ring the Bell or go back the way that you came to the Fork in the road? ";
                    this.stateCur=GameState.CASTLE;
                }else if(sInput.toLowerCase().match("right")){
                    sReply = rightForkreply;
                    this.stateCur=GameState.HOUSE;
                }else{
                    sReply = waitReply+forkReply;//Left branch goes to castle, right branch to forest
                    this.stateCur=GameState.FORK;
                }
                break;
    //Left 
            case GameState.CASTLE:
                if(sInput.toLowerCase().match("bell")&&!this.treasure){
                    sReply = "You strike the silver bell with the hammer.  The sound of the bell is soft at first, and then gets gradually louder until it it is unbearably loud.  As the sound grows louder, the wooden gate of the castle begins to tremble until it suddenly bursts open!  Do you Enter the door, or return to the Fork?";
                    this.stateCur=GameState.BELL;
                }else if(sInput.toLowerCase().match("bell")&&this.treasure){
                    sReply = "You strike the silver bell with the hammer.  However, this time nothing happens. The door to the castle remains closed.  After standing there for a few minutes, you head back to the fork. " +forkReply;
                    this.stateCur=GameState.FORK;
                }
                else{
                    sReply=forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            case GameState.BELL:
                if(sInput.toLowerCase().match("enter")){
                    sReply = "You enter the castle, and see that it has been abandoned for a long time.  The main hallway is covered in a thick layer of dust.  Columns on either side of the hall support an ornate arched ceiling.  At the end of the hall there is a door.  Do you Open the door or return to the Fork";
                    this.stateCur=GameState.DOOR;
                }else{
                    sReply=forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            case GameState.DOOR:
                if(sInput.toLowerCase().match("open")){
                    sReply = "You enter the room.  At the far end of the room, an ornate throne sits on a dais.  Two smaller thrones sit on either side.  In front of the throne, there is a table with a key sitting on it.  Do you take the Key or leave the castle and return to the Fork?";
                    this.stateCur=GameState.KEY;
                }else{
                    sReply=forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            case GameState.KEY:
                if(sInput.toLowerCase().match("key")){
                    sReply = "You take the key from the table.  When the key is in your hand, it begins to pull you away from the table towards a small archway at the back of the room.  Do you Drop the key or Hold onto it?";
                    this.stateCur=GameState.HOLD;
                }else{
                    sReply=forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            case GameState.HOLD:
                if(sInput.toLowerCase().match("hold")){
                    sReply = "The key pulls you through the archway in the back of the room.  A torch on the wall suddenly flares to light.  You find yourself in an alcove with a treasure chest.  The key pulls you to the treasure chest and you feel your hand insert the key into the lock.  The treasure chest springs open and you find yourself staring at a rich collection of jewels and coins.  You scoop up the treasure into your rucksack, and quickly leave the castle to return to the fork in the road.  As you leave, the magical key floats back to the table, and the castle doors swing shut. " + forkReply;
                    this.treasure=true;
                    this.stateCur=GameState.FORK;
                }else {
                    sReply="In your state of alarm, you drop the key.  You watch in surprise as it floats back to the table and lands on it.  You run from the castle, and the door slams behind you." + forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
//right fork
            case GameState.HOUSE:
                if(sInput.toLowerCase().match("enter")){
                    sReply = "You open the door and  quickly step into the warm interior of the house.  A cold wind blows the door shut.  An old man sits on a rocking chair by the fire.  'Would you like to play a game?', he asks.  If you would like to play the game, reply Yes.  For any other response you will leave the house and continue down the road.";
                    this.stateCur=GameState.QUIZ;
                }else if(sInput.toLowerCase().match("continue")){
                    sReply=pathReply;
                    this.stateCur=GameState.PATH;
                }
                else{
                    sReply=forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            //Quiz minigame
            case GameState.QUIZ:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "All right.  I will ask you 5 questions, so please provide one word answers.  Here is the first question:  Enter the last name of any member of Monty Python.";
                    this.quiz=0;
                    this.stateCur=GameState.QUIZ1;
                }else{
                    sReply="You leave the house.    The road on your right leads deeper into the forest .  The road on your left leads back to the fork.  Do you go Right or Left?";
                    this.stateCur=GameState.FORESTROAD;
                }
                break;
            case GameState.QUIZ1:
                if(sInput.toLowerCase().match("cleese")||sInput.toLowerCase().match("palin")||sInput.toLowerCase().match("chapman")||sInput.toLowerCase().match("jones")||sInput.toLowerCase().match("gilliam")||sInput.toLowerCase().match("idle")){
                    this.quiz++;
                    sReply = "Congratulations!  That is the correct answer.  "+quizQ2;
                    this.stateCur=GameState.QUIZ2;
                }else{
                    sReply="I am sorry but that answer is incorrect.  "+quizQ2;
                    this.stateCur=GameState.QUIZ2;
                }
                break;
            case GameState.QUIZ2://Quiz minigame
                if(sInput.toLowerCase().match("true")){
                    this.quiz++;
                    sReply = "Congratulations!  That is the correct answer. "+quizQ3;
                    this.stateCur=GameState.QUIZ3;
                }else{
                    sReply="I am sorry but that answer is incorrect.  "+quizQ3;
                    this.stateCur=GameState.QUIZ3;
                }
                break;
            case GameState.QUIZ3://Quiz minigame
                if(sInput.toLowerCase().match("curve")){
                    sReply = "Congratulations!  That is the correct answer.  "+quizQ4;
                    this.quiz++;
                    this.stateCur=GameState.QUIZ4;
                }else{
                    sReply="I am sorry but that answer is incorrect.  "+quizQ4;
                    this.stateCur=GameState.QUIZ4;
                }
                break;
            case GameState.QUIZ4://Quiz minigame
                if(sInput.toLowerCase().match("child")){
                    this.quiz++;
                    sReply = "Congratulations!  That is the correct answer.  "+quizQ5;
                    this.stateCur=GameState.QUIZ5;
                }else{
                    sReply="I am sorry but that answer is incorrect.  "+quizQ5;
                    this.stateCur=GameState.QUIZ5;
                }
                break;
            case GameState.QUIZ5://Quiz minigame
                if(sInput.toLowerCase().match("1965")){
                    this.quiz++;
                    sReply = "Congratulations!  That is the correct answer.  You answered "+this.quiz+" out of 5 questions correctly.  Goodbye!"+exitHouse+pathReply;
                    this.stateCur=GameState.PATH;
                }else{
                    sReply="I am sorry but that answer is incorrect.  You answered "+this.quiz+" out of 5 questions correctly.  Goodbye! "+exitHouse+pathReply;
                    this.stateCur=GameState.PATH;
                }
                break;
            case GameState.FORESTROAD:
                if(sInput.toLowerCase().match("right")){
                    sReply = pathReply;
                    this.stateCur=GameState.PATH;
                }else{
                    sReply=waitReply+forkReply;
                    this.stateCur=GameState.FORK;
                }
                break;
            case GameState.PATH:
                if(sInput.toLowerCase().match("path")){
                    sReply = "The path winds through the trees and you enter a clearing.  At the far side of the clearing is a cliff face.  There appears to be a cave in the side of the cliff.  Do you Enter the cave or Return to the road?";
                    this.stateCur=GameState.CAVE;
                }else{
                    sReply=townReply;
                    this.stateCur=GameState.TOWN;
                }
                break;
            case GameState.CAVE:
                if(sInput.toLowerCase().match("enter")){
                    sReply="As you enter the cave, a large rockfall blocks the entrance.  You are trapped inside!  You might be able to move the rocks if you are strong enough.  To see if you can move the rocks and exit the cave, enter any word.  ";
                    this.stateCur=GameState.CHECK;
                }else{
                    sReply="You wander back to the road. "+townReply;
                    this.stateCur=GameState.TOWN;
                }
                break;
            case GameState.CHECK:
                if(sInput.toLowerCase().match("")){
                var caveCheck=Math.random();
                if(caveCheck>0.6){
                    dReply="You notice a shiny diamond as you are clearing the rocks.  You place it in a special pocket in your rucksack!";
                    this.diamond=true;
                }
                if(caveCheck>=0.3){
                    cReply="With a final gasp, you heave the last of the massive rocks out of the entrance and climb out of the cave!  You race back down the path and continue along the road.  ";
                    sReply=dReply+cReply+townReply;
                    this.stateCur=GameState.TOWN;
                    this.cave=true;
                }else{
                    sReply="You realize that you are trapped in the cave.  Suddenly you feel dizzy as you start to fade away...To play again, type anything..";
                    this.stateCur=GameState.WELCOMING;
                    this.treasure=false;
                    this.quiz=-1;
                    this.cave=false;
                    this.diamond=false;
                }
            }
            break;

            case GameState.TOWN:
                if(sInput.toLowerCase().match("enter")){
                    sReply = "You enter the main gates of the town, which are open.  You walk down the main street and turn right onto a side street.  There is your home!  Do you enter your Home or Leave the town?";
                    this.stateCur=GameState.HOME;
                }else{
                    sReply=resetReply;
                    this.stateCur=GameState.WELCOMING;
                    this.treasure=false;
                    this.quiz=-1;
                    this.cave=false;
                    this.diamond=false;
                }
                break;
            case GameState.HOME:
            if(sInput.toLowerCase().match("home")){    
                if(this.treasure){
                        tReply= " Congratulation! You have found the treasure! ";
                        }else if(!this.treasure){
                        tReply=" Maybe you missed something at the castle. ";
                }
                if(this.diamond){
                    dReply=" Wow!  You found a massive diamond! "
                }
                if(this.cave){
                    cReply=" Amazing!  You escaped from the dangerous cave!! "
                }
                if(this.quiz<0){
                    qReply=" Maybe you missed something along the forest path... ";
                }
                else if(this.quiz<1){
                        qReply=" Unfortunately you did not correctly answer any of the quiz questions! ";
                }else if(this.quiz<3)  {
                        qReply=" You correctly answered only "+this.quiz+" of 5 quiz questions. ";
                }else if(this.quiz<5){
                    qReply=" Good job!  You correctly answered "+this.quiz+" of 5 quiz questions. "
                }else if(this.quiz==5){
                    qReply=" Excellent!  You correctly answered "+this.quiz+" of 5 quiz questions. "
                }                      
                sReply= homeReply+ tReply+ " "+qReply+dReply+cReply+ " To play again, type anything...";
                this.stateCur=GameState.WELCOMING;
                this.treasure=false;
                this.quiz=-1;
                this.cave=false;
                this.diamond=false;
            }
            else{
                sReply="You wander around the town for a while.  Then you exit the main gates. "+resetReply;
                this.stateCur=GameState.WELCOMING;
                this.treasure=false;
                this.quiz=-1;
                this.cave=false;
                this.diamond=false;
            }   
                break;

        }
        return([sReply]);
    }
}