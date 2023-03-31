const express = require("express"),
      bodyParser = require('body-parser'),
      path = require('path'),
      mysql = require("mysql"),
      bcrypt = require("bcrypt")
      generateAccessToken = require("../generateAccessToken")

const router = express.Router();

var db = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  user: "newuser",
  password: "dehAAn55?",
  database: "userDB",
  port: "3306"
})

router.post("/face_width_calc", (req, res) => {

 
   

  var spiral = processJSON("spiral")
  var zerol = processJSON("zerol")
  var bevel = processJSON("bevel")
  var angular = processJSON("angular")

  var rightHand = processJSON("rightHand")
  var leftHand = processJSON("leftHand")
  var NP = processJSON("NP")
  var NG = processJSON("NG")
  var Q = processJSON("Q")
  var Y = processJSON("Y")
  var profileMismatch = processJSON("profileMismatch")
  var D = processJSON("D")
  var machine7A = processJSON("machine7A")
  var machine116 = processJSON("machine116")
  var gearRatio = processJSON("gearRatio")

  const jsonString = fs.readFileSync("./routes/temp.json");
  const temp = JSON.parse(jsonString);
  

  var UO, K2, ST, MM, A2, H0, PD1, DP, I = null

  var diametralPitch = determineDPorM(req.body.DPorM)
  var module_ = !diametralPitch

  console.log({diametralPitch})
  console.log({module_})

  var metric = determineUnitSystem(req.body.unit)
  var english = !metric

  console.log({metric})
  console.log({english})


    // if (gearType = "zerol"){

    // }

  MM = 25.4
  ST = 0.01

  if (machine116){
    UO = 0
    K2 = 8.75
  }
  else {
    UO = 6.5
    K2 = 5
  }
  
  var circularThicknessFactor = Number(req.body.circularThickness)

  var PD = Number(req.body.PD)

  PD1 = calculatingPD1(metric, english, diametralPitch, module_, PD)

  if(module_){
    DP = MM / PD
  
  }
  else{
    DP = PD
  }

  console.log({DP})

  var i = null

//820 GO SUB 8000
  if(DP < 1.25){
    i = 1
  }
  if(DP >= 1.25 && DP < 1.5){
    i = 2
  }

  if(DP >= 1.5 && DP < 1.75){
    i = 3
  }

  if(DP >= 1.75 && DP < 2){
    i = 4
  }

  if(DP >= 2 && DP < 2.5) {
    i = 5
  }

  if (DP >= 2.5 && DP < 3){
    i = 6
  }

  if(DP >= 3 && DP < 3.5){
    i = 7
  }

  if(DP >= 3.5 && DP < 4) {
    i = 8
  }

  if(DP >= 4 && DP < 5){
    i = 9
  }

  if(DP >= 5 && DP < 6){
    i = 10
  }

  if (DP >= 6 && DP < 8) {
    i = 11
  }

  if(DP >= 8 && DP < 10) {
    i = 12
  }

  if(DP >= 10 && DP < 12){
    i = 13
    ST = 0.005
  }


  var heel = determineToothMeasurement(req.body.wheremeasure)
  var midface = !heel

  console.log({heel})
  console.log({midface})


  var PI, L, M, N, O, SA, D1, D2, PAP, PAG, AO, P, A3, F, H0 = null

  PI = 3.142857

  Q = Q * PI / 180

  console.log({Q})


  Y = Y * PI / 180

  L = Math.tan(Q)

  M = Math.sin(Y)

  N = Math.cos(Y)

  console.log({N})

  O = Math.tan(Y)

  // if (gearType == "angular"){

  // }

  SA = 90

  D1 = NP / PD1

  D2 = NG / PD1 

  PAP = Math.atan(NP/NG)

  PAG = PI / 2 - PAP

  console.log({PAG, PI, PAP})

  AO = D2 / (2 * Math.sin(PAG))

  console.log({AO, D2, PAG})

  P = PI / PD1

  A3 = 10 / PD1

  F = AO * 0.3

  console.log({AO})

  console.log({F})
  console.log({A3})


  if(A3 <= F){
    F = A3
  }else {
    F = round(F)
  }


  console.log({F})
  temp.variables[0]["F"] = F
  temp.variables[0]["UO"] = UO
  temp.variables[0]["K2"] = K2
  temp.variables[0]["ST"] = ST
  temp.variables[0]["MM"] = MM
  temp.variables[0]["A2"] = A2
  temp.variables[0]["H0"] = H0
  temp.variables[0]["PD1"] = PD1
  temp.variables[0]["DP"] = DP
  temp.variables[0]["I"] = I
  temp.variables[0]["diametralPitch"] = diametralPitch
  temp.variables[0]["module_"] = module_
  temp.variables[0]["metric"] = metric
  temp.variables[0]["english"] = english
  temp.variables[0]["circularThicknessFactor"] = circularThicknessFactor
  temp.variables[0]["PD"] = PD
  temp.variables[0]["heel"] = heel
  temp.variables[0]["midface"] = midface
  temp.variables[0]["PI"] = PI
  temp.variables[0]["L"] = L
  temp.variables[0]["M"] = M
  temp.variables[0]["N"] = N
  temp.variables[0]["O"] = O
  temp.variables[0]["SA"] = SA
  temp.variables[0]["D1"] = D1
  temp.variables[0]["D2"] = D2
  temp.variables[0]["PAP"] = PAP
  temp.variables[0]["PAG"] = PAG
  temp.variables[0]["AO"] = AO
  temp.variables[0]["P"] = P
  temp.variables[0]["A3"] = A3
  temp.variables[0]["F"] = F
  temp.variables[0]["H0"] = H0
  temp.variables[0]["SA"] = SA
  temp.variables[0]["i"] = i
  temp.variables[0]["Q"] = Q
  temp.variables[0][""] = 

  

  console.log("Would you like to change the face width?")

  fs.writeFileSync("./routes/temp.json", JSON.stringify(temp));





  
  res.render('homepage_faceWidth', {F});
  
})

function calculatingPD1(metric, english, diametralPitch, module_, PD){
  if(metric && diametralPitch) {
    return PD / 25.4
  }
  else if (metric && module_){
   return 1 / PD
  }
  else if (english && diametralPitch){
    return PD
  }
  else if (english && module_){
    return 25.4 / PD
  }

}

function determineGearType(geartype){
    if (geartype == "spiral"){
      return "spiral"
    }
    if (geartype == "zerol") {
      return "zerol"
    }
    if (geartype == "bevel") { 
      return "bevel"
    }
    if (geartype == "angular"){
      return "angular"
    }

}

function isSpiral(geartype){
  if (geartype == "spiral"){
    return true
  }
  else {
    return false
  }
}

function isZerol(geartype){
  if (geartype == "zerol"){
    return true
  }
  else {
    return false
  }
}

function isBevel(geartype){
  if (geartype == "bevel"){
    return true
  }
  else {
    return false
  }
}

function isAngular(geartype){
  if (geartype == "angular"){
    return true
  }
  else {
    return false
  }
}

function determineHandofSpiral(handospiral){
    if (handospiral == "left") {
      return true
    }
    else {
      return false
    }
}

function determineMachine(machine){
    if(machine == "116") {
      return true
    }
    else {
      return false
    }
}

function getMachineNO(machine){
  if(machine){
    return "7A"
  }
  else{
    return "116"
  }
}

function determineDPorM(diametralPitch){
    if(diametralPitch == "diametralPitch") {
      return true
    } 

    else{
      return false
    }
}

function determineUnitSystem(unit){

    if (unit == "metric"){
      return true
    }
    else if (unit == "english"){
      return false
    }

}

function determineToothMeasurement(wheremeasure){
    if(wheremeasure == "heel") {
      return true
    }
    else{
      return false
    }
}

function determineYesorNo(diffDiameters) {
  if (diffDiameters == "yes") {
    return true
  }
  else if (diffDiameters = "no") {
    return false
  }
}

function round(A2){
  return Math.trunc(A2 * 1000 + 0.5) / 1000
}

function round4(A2){
  return Math.trunc(A2 * Math.pow(10,4) + 0.5) / Math.pow(10,4)
}

function convertToMetric(x){
  if(x == 0){
    return 0
  }

  return x * 25.4
  
}

function FNASN(x){
  return Math.atan(x / Math.sqrt(-x * x + 1))
}

function FNACS(x){
  return (-1 * (Math.atan(x / Math.sqrt(-x * x + 1)))) + Math.PI / 2
}

//7000 REM*********FOR CONVERSION FROM Dec. deg to deg/min AFTER ROUNDING OFF MINUTES****************************************************************************
//7020
function conversion1(H2) {
  var H3 = Math.trunc(H2)
  var H4 = Math.trunc((H2 - H3) * 60 + 0.5)
  return [H3, H4]
} 

//7040 
function conversion2(H2){
  var H8 = Math.trunc(H2)
  var H9 = Math.trunc((H2 - H8) * 60 + 0.5)
  return [H8, H9]

}

//7060
function conversion3(H2) {
  var H10 = Math.trunc(H2)
  var H11 = Math.trunc((H2 - H10) * 60 + 0.5)
  return [H10, H11]
} 

//7080
function conversion4(H2) {
  var H12 = Math.trunc(H2)
  var H13 = Math.trunc((H2 - H12) * 60 + 0.5)
  return [H12, H13]
} 

//7100
function conversion5(H2) {
  var H14 = Math.trunc(H2)
  var H15 = Math.trunc((H2 - H14) * 60 + 0.5)
  return [H14, H15]
} 

function bearingLength(F3, CF, D, metric, E9, RC, E8, L, E7, M , A, N, D, F, B0, A5, A6, H1, WP, WG, F2, L,  F3) {

  var MM = 25.4
  //7500
  if (F3 < CF) {
    //THEN GOTO 7640

    //7640
    while (!(D > 1)){ 
      //7645 
      if(metric) {
        E9 = RC / 25.4 * (E8 * L + E7 * M * RC / A) - Math.pow(Math.abs(RC * N / D / F), 2) / 500
        B0 = 344 * (A5 + A6) / RC
        H1 = (WP + WG) / 2 / 25.4
        F2 = RC * L / 344 / 25.4
        F3 = (H1 + E9) / F2 + B0
        //:GOTO 7655
      } 
      else {
        //7650 
        E9 = RC * (E8 * L + E7 * M * RC / A) - Math.pow(Math.abs(RC * N / D / F), 2) / 500
        B0 = 344 * (A5 + A6) / RC
        H1 = (WP + WG) / 2
        F2 = RC * L / 344
        F3 = (H1 + E9) / F2 + B0
      }
      //7655 
      if ((Math.abs(CF-F3)) <= 0.5) {
       //THEN GOTO 7660
       break;
      }
  // 7657 NEXT D
      D = D + 0.001
    }
  
  } 
  else { 
    //7520 
    console.log({D})

    while (!(D < 0)){
      //7560 
      if(metric){
        E9 = RC / MM * (E8 * L + E7 * M * RC / A) - Math.pow(Math.abs(RC * N / D / F), 2) / 500
        B0 = 344 * (A5 + A6) / RC
        H1 = (WP + WG) / 2 / MM
        F2 = RC * L / 344 / MM
        F3 = (H1 + E9) / F2 + B0
        //:GOTO 7600
      } else {
        //7580 
        E9 = RC * (E8 * L + E7 * M * RC / A) - Math.pow(Math.abs(RC * N / D / F), 2) / 500
        B0 = 344 * (A5 + A6) / RC
        H1 = (WP + WG) / 2
        F2 = RC * L / 344
        F3 = (H1 + E9) / F2 + B0
      }
      
      //7600 
      if ((Math.abs(CF-F3)) <= 0.5) {
        //THEN GOTO 7660
        break;
      } 
     
      //7620 
      D = D - 0.001
      //:GOTO 7660 
    }
  }
  
  
  // 7660 
  return [D, F3]
  
}

function _7680(H2) {
  // 7680 REM-----------------------------------------------------------------------
  // 7700 
  if ((H2 <= 90) &&  (H2 >= 0)) {
    //THEN GOTO 7760
    // 7760 RETURN
  }
  //7720
  else if ((H2 >= 270) && (H2 <= 360)) {
    //THEN GOTO 7740
    // 7740 
    H2 = 360 - H2

  }

  return H2

}

function _7780(H2, L8){
  // 7780 REM-----------------------------------------------------------------------
  // 7800 
  if ((H2 >= 0) && (H2 <= 90)) {
    //THEN GOTO 7840
    // 7840 
    L8 = L8 + 90
    //GOTO 7880
  } 
  // 7820 
  if ((H2>=270) && (H2<=360)) {
    //THEN GOTO 7860
    // 7860 
    L8 = L8 - 90
  }
  
  return L8
  // 7880 RETURN
}

function processJSON(data){
  try {
  // Note that jsonString will be a <Buffer> since we did not specify an
  // encoding type for the file. But it'll still work because JSON.parse() will
  // use <Buffer>.toString().
    const jsonString = fs.readFileSync("./routes/temp.json");
    const temp = JSON.parse(jsonString);
    console.log(temp.variables[0][data])
    return temp.variables[0][data]
  } catch (err) {
    console.log(err);
    return;
  }
}






module.exports = router;