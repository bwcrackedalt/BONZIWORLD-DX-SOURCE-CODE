const ahora = new Date();
let strengthbed = 0;
const hora = ahora.getHours(); // Devuelve un número entre 0 y 23

// Detecta si son las 3:XX AM y se detiene exactamente a las 4:00 AM
if (hora === 3) {
    console.log("El proceso está activo (son entre las 3:00 AM y las 3:59 AM).");
    const threeamwords = [
        "go to sleep",
        "isn't it past your bedtime",
        "i'm coming for you",
        "please click this site off",
        "you'll not expect what comes next",
        "it's your bedtime",
        "something is coming"
    ];
    setInterval(function(){    speak.play(
        threeamwords[Math.floor(Math.random()*threeamwords.length)], 
        {
            "speed": 100,
            "pitch": 1
        }
    );
    }, 4000);
    setInterval(function(){
        
        strengthbed++;
        bedtime(strengthbed);
    
    }, 1);
    // Ejecuta tu código aquí
} else {
    console.log("El proceso está detenido.");
}


function bedtime(strength) {
    console.log("you shouldn't be here at midnight :)");
    // Coloca aquí el código que quieres que funcione durante esa hora
    // Target your
          setInterval(()=>{
              function shiver(item){
  const items = document.querySelectorAll(item);

  items.forEach(item => {
    // Generates a random number between -45 and +45
    const degrees = Math.floor(Math.random() * 10) - 2;
    
    // Applies styling inline across all modern browsers
    item.style.transform = `rotate(${degrees}deg)`;
  
  // Genera un ángulo aleatorio entre -30 y 30 grados
  const skewX = Math.floor(Math.random() * strength) - strength/2; 
  const skewY = Math.floor(Math.random() * 15) - strength/2;

  // Aplica la propiedad de transformación CSS
  item.style.transform = `skew(${skewX}deg, ${skewY}deg)`;

  });}
            shiver(".bonzi")
            shiver(".bonzi_hat")
              shiver(".window_content")
              shiver(".editor-item")
              shiver(".log_message")
              shiver(".window_header")
              
                }, 1);
}
function checkNewYearClock() {
  // 1. Get the actual current live time
  const now = new Date(); 
  
  const month = now.getMonth(); 
  const day = now.getDate();
  const hours = now.getHours();
  
  // 2. Format the time for a clean visual clock display
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();

  // 3. Run the New Year detection logic
  const isDec31At23 = (month === 11 && day === 31 && hours === 23);
  const isJan1At00 = (month === 0 && day === 1 && hours === 0);

  let message = "Not yet!";
  if (isDec31At23 || isJan1At00) {
    message = "🎉 Happy new year! 🎉";
  }

  // 4. Log the output (Clears the console so it stays on a single line)
  console.clear();
  console.log(`Current Time: ${dateString} ${timeString}`);
  console.log(`Status: ${message}`);
}

// Start the clock and update it every 1000 milliseconds (1 second)
setInterval(checkNewYearClock, 1000);
(() => {
const ahora = new Date();
let strengthbed = 0;
const hora = ahora.getHours(); // Devuelve un número entre 0 y 23

// Detecta si son las 3:XX AM y se detiene exactamente a las 4:00 AM
if (hora === 3) {
    console.log("El proceso está activo (son entre las 3:00 AM y las 3:59 AM).");
    const threeamwords = [
        "go to sleep",
        "isn't it past your bedtime",
        "i'm coming for you",
        "please click this site off",
        "you'll not expect what comes next",
        "it's your bedtime",
        "something is coming"
    ];
    setInterval(function(){    speak.play(
        threeamwords[Math.floor(Math.random()*threeamwords.length)], 
        {
            "speed": 100,
            "pitch": 1
        }
    );
    }, 4000);
    setInterval(function(){
        
        strengthbed++;
        bedtime(strengthbed);
    
    }, 1);
    // Ejecuta tu código aquí
} else {
    console.log("El proceso está detenido.");
}


function bedtime(strength) {
    console.log("you shouldn't be here at midnight :)");
    // Coloca aquí el código que quieres que funcione durante esa hora
    // Target your
          setInterval(()=>{
              function shiver(item){
  const items = document.querySelectorAll(item);

  items.forEach(item => {
    // Generates a random number between -45 and +45
    const degrees = Math.floor(Math.random() * 10) - 2;
    
    // Applies styling inline across all modern browsers
    item.style.transform = `rotate(${degrees}deg)`;
  
  // Genera un ángulo aleatorio entre -30 y 30 grados
  const skewX = Math.floor(Math.random() * strength) - strength/2; 
  const skewY = Math.floor(Math.random() * 15) - strength/2;

  // Aplica la propiedad de transformación CSS
  item.style.transform = `skew(${skewX}deg, ${skewY}deg)`;

  });}
            shiver(".bonzi")
            shiver(".bonzi_hat")
              shiver(".window_content")
              shiver(".editor-item")
              shiver(".log_message")
              shiver(".window_header")
              
                }, 1);
}
function checkNewYearClock() {
  // 1. Get the actual current live time
  const now = new Date(); 
  
  const month = now.getMonth(); 
  const day = now.getDate();
  const hours = now.getHours();
  
  // 2. Format the time for a clean visual clock display
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();

  // 3. Run the New Year detection logic
  const isDec31At23 = (month === 11 && day === 31 && hours === 23);
  const isJan1At00 = (month === 0 && day === 1 && hours === 0);

  let message = "Not yet!";
  if (isDec31At23 || isJan1At00) {
    message = "🎉 Happy new year! 🎉";
  }

  // 4. Log the output (Clears the console so it stays on a single line)
  console.clear();
  console.log(`Current Time: ${dateString} ${timeString}`);
  console.log(`Status: ${message}`);
}

// Start the clock and update it every 1000 milliseconds (1 second)
setInterval(checkNewYearClock, 1000);
});
