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

router.post("/finishing_pointwidth", (req, res) => {

  var F = processJSON("F")
  var AO = processJSON("AO")
  var PD1 = processJSON("PD1")
  var NG = processJSON("NG")
  var metric = processJSON("metric")
  var NP = processJSON("NP")
  var MM = processJSON("MM")
  var UO = processJSON("UO")
  var RC = processJSON("RC")
  var DUO = processJSON("DUO")
  var ST = processJSON("ST")
  var BOP = processJSON("BOP")
  var BOG = processJSON("BOG")
  var PAP = processJSON("PAP")
  var PAG = processJSON("PAG")
  var D1 = processJSON("D1")
  var AOP = processJSON("AOP")
  var D2 = processJSON("D2")
  var AOG = processJSON("AOG")
  var P = processJSON("P")
  var L = processJSON("L")
  var N = processJSON("N")
  var circularThicknessFactor = processJSON("circularThicknessFactor")
  var M = processJSON("M")
  var Q = processJSON("Q")
  var O = processJSON("O")
  var DC = processJSON("DC")
  var K = processJSON("K")
  var HK = processJSON("HK")
  var HT = processJSON("HT")
  var C = processJSON("C")
  var english = processJSON("english")
  var YO = processJSON("YO")
  var J = processJSON("J")
  var YI = processJSON("YI")
  var A9 = processJSON("A9")
  var B3 = processJSON("B3")

  var WMP = null

  var WG = Number(req.body.WG)
  //1460

  console.log("hELLO")
  
  if (metric) {
    WG = WG * MM
  }

  var WOP = P * Math.cos(YO) - 2 * L * (BOP + BOG) - WG
  var WIP = J * P * Math.cos(YI) / AO - 2 * L * (A9 + B3) - WG

  console.log({P, YO, L, BOP, BOG, WG})
  console.log({J, P, YI, AO, L, A9, B3, WG})

  var num1 = 0.003

  if (metric) {
    WOP = convertToEnglish(WOP)
    WIP = convertToEnglish(WIP)
    var num1 = 0.0762
  }

  console.log({WOP})
  console.log({WIP})

  if(WOP < WIP){
      //1440
      console.log("CALC. PINTION FIN. LIMIT P.W.   " + "Wlp (WOP)=  " + WOP)
      var WLP = WOP
      var WMP = WIP //1500
      console.log("MAX. PINION SLOT WIDTH= " + WMP)
      if (metric) {
        WMP = convertToMetric(WMP)
      }
      var WBP = WMP / 2 + num1
      if (metric) {
        WBP = convertToEnglish(WBP)
        WMP = convertToEnglish(WMP)
      }
      console.log("SEE CUTTER SPECS TABLE-THEO. BLD. PT.FOR PIN.CUTTER =  " + WBP)
      console.log("WHAT PINION. FIN. P.W.  ")
      console.log("INPUT PINION BLD.PT.  ")
      console.log("INPUT GEAR BLD.PT.  ")
      res.render('homepage_PW1', {WOP, WMP, WBP});
    }
  else{
      console.log("CALC. PINION FIN. LIMIT P.W.   " + "Wlp (WIP) = " + WIP)
      var WLP = WIP
      var WMP = WOP
      console.log("MAX. PINION SLOT WIDTH= " + WMP)
      if (metric) {
        WMP = convertToMetric(WMP)
      }
      var WBP = WMP / 2 + num1
      if (metric) {
        WBP = convertToEnglish(WBP)
        WMP = convertToEnglish(WMP)
      }
      console.log("SEE CUTTER SPECS TABLE-THEO. BLD. PT.FOR PIN.CUTTER =  " + WBP)
      console.log("WHAT PINION. FIN. P.W.  ")
      console.log("INPUT PINION BLD.PT.  ")
      console.log("INPUT GEAR BLD.PT.  ")
      res.render('homepage_PW2', {WIP, WMP, WBP});
  }


  const jsonString = fs.readFileSync("./routes/temp.json");
  const temp = JSON.parse(jsonString);

  temp.variables[0]["F"] = F
  temp.variables[0]["AO"] = AO
  temp.variables[0]["PD1"] = PD1
  temp.variables[0]["NG"] = NG
  temp.variables[0]["metric"] = metric
  temp.variables[0]["NP"] = NP
  temp.variables[0]["MM"] = MM
  temp.variables[0]["UO"] = UO
  temp.variables[0]["RC"] = RC
  temp.variables[0]["DUO"] = DUO
  temp.variables[0]["ST"] = ST
  temp.variables[0]["BOP"] = BOP
  temp.variables[0]["BOG"] = BOG
  temp.variables[0]["PAP"] = PAP
  temp.variables[0]["PAG"] = PAG
  temp.variables[0]["D1"] = D1
  temp.variables[0]["AOP"] = AOP
  temp.variables[0]["D2"] = D2
  temp.variables[0]["AOG"] = AOG
  temp.variables[0]["P"] = P
  temp.variables[0]["L"] = L
  temp.variables[0]["N"] = N
  temp.variables[0]["circularThicknessFactor"] = circularThicknessFactor
  temp.variables[0]["M"] = M
  temp.variables[0]["Q"] = Q
  temp.variables[0]["O"] = O
  temp.variables[0]["DC"] = DC
  temp.variables[0]["K"] = K
  temp.variables[0]["HK"] = HK
  temp.variables[0]["HT"] = HT
  temp.variables[0]["C"] = C
  temp.variables[0]["YO"] = YO
  temp.variables[0]["J"] = J
  temp.variables[0]["YI"] = YI
  temp.variables[0]["A9"] = A9
  temp.variables[0]["B3"] = B3
  temp.variables[0]["WMP"] = WMP
  temp.variables[0]["WG"] = WG
  temp.variables[0]["WOP"] = WOP
  temp.variables[0]["WIP"] = WIP
  temp.variables[0]["WLP"] = WLP
  temp.variables[0]["WBP"] = WBP
  temp.variables[0]["num1"] = num1
  temp.variables[0]["english"] = english



  fs.writeFileSync("./routes/temp.json", JSON.stringify(temp));
  
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

function convertToEnglish(x){
  if(x == 0){
    return 0
  }

  return x / 25.4
  
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
    console.log(data + " " + temp.variables[0][data])
    return temp.variables[0][data]
  } catch (err) {
    console.log(err);
    return;
  }
}






module.exports = router;