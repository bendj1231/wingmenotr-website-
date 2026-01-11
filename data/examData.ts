

export interface ExamQuestion {
  q: string;
  options: string[];
  answer: string;
}

const PPL_AIR_LAW_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. With respect to the certification of airmen, which is a category of aircraft?",
    options: [
      "Gyroplane, helicopter, airship, free balloon.",
      "Airplane, rotorcraft, glider, lighter-than-air.",
      "Single-engine land and sea, multiengine land and sea."
    ],
    answer: "B"
  },
  {
    q: "2. With respect to the certification of airmen, which is a class of aircraft?",
    options: [
      "Airplane, rotorcraft, glider, lighter-than-air.",
      "Single-engine land and sea, multiengine land and sea.",
      "Lighter-than-air, airship, hot air balloon, gas balloon."
    ],
    answer: "B"
  },
  {
    q: "3. With respect to the certification of aircraft, which is a category of aircraft?",
    options: [
      "Normal, utility, acrobatic.",
      "Airplane, rotorcraft, glider.",
      "Landplane, seaplane."
    ],
    answer: "A"
  },
  {
    q: "4. With respect to the certification of aircraft, which is a class of aircraft?",
    options: [
      "Airplane, rotorcraft, glider, balloon.",
      "Normal, utility, acrobatic, limited.",
      "Transport, restricted, provisional."
    ],
    answer: "A"
  },
  {
    q: "5. The definition of nighttime is?",
    options: [
      "Sunset to sunrise.",
      "1 hour after sunset to 1 hour before sunrise.",
      "The time between the end of evening civil twilight and the beginning of morning civil twilight."
    ],
    answer: "C"
  },
  {
    q: "6. An ATC clearance provides:",
    options: [
      "priority over all other traffic.",
      "adequate separation from all traffic.",
      "authorization to proceed under specified traffic conditions in controlled airspace."
    ],
    answer: "C"
  },
  {
    q: "7. When must a current pilot certificate be in the pilot’s personal possession or readily accessible in the aircraft?",
    options: [
      "When acting as a crew chief during launch and recovery.",
      "Only when passengers are carried.",
      "Anytime when acting as pilot in command or as a required crewmember."
    ],
    answer: "C"
  },
  {
    q: "8. What document(s) must be in your personal possession or readily accessible in the aircraft while operating as pilot in command of an aircraft?",
    options: [
      "Certificates showing accomplishment of a checkout in the aircraft and a current biennial flight review.",
      "A pilot certificate with an annual flight review and a pilot logbook showing recency of experience.",
      "An appropriate pilot certificate and an appropriate current medical certificate if required."
    ],
    answer: "C"
  },
  {
    q: "9. In regard to privileges and limitations, a private pilot may:",
    options: [
      "act as pilot in command of an aircraft carrying a passenger for compensation if the flight is in connection with a business or employment.",
      "not pay less than the pro rata share of the operating expenses involves only fuel, oil, airport expenditures, or rental fees.",
      "not be paid in any manner for the operating expenses of a flight."
    ],
    answer: "B"
  },
  {
    q: "10. The final authority as to the operation of an aircraft is the:",
    options: [
      "air Transportation Office",
      "pilot in command.",
      "aircraft manufacturer."
    ],
    answer: "B"
  },
  {
    q: "11. Who is responsible for determining if an aircraft is in condition for safe flight?",
    options: [
      "A certificated aircraft mechanic.",
      "The pilot in command.",
      "The tower or operator."
    ],
    answer: "B"
  },
  {
    q: "12. Where may an aircraft’s operating limitations be found?",
    options: [
      "On the Airworthiness Certificate.",
      "In the current, FAA-approved flight manual, approved manual material, marking, and placards, or any combination thereof.",
      "In the aircraft airframe and engine logbooks."
    ],
    answer: "B"
  },
  {
    q: "13. No person may attempt to act as a crewmember of a civil aircraft with:",
    options: [
      ".008 percent by weight or more alcohol in the blood.",
      ".004 percent by weight or more alcohol in the blood.",
      ".04 percent by weight or more alcohol in the blood."
    ],
    answer: "C"
  },
  {
    q: "14. A person may not act as a crewmember of a civil aircraft if alcoholic beverages have been consumed by that person within the preceding:",
    options: [
      "8 hours.",
      "12 hours.",
      "24 hours."
    ],
    answer: "A"
  },
  {
    q: "15. Under what condition, if any, may a pilot allow a person who is obviously under the influence of drugs to be carried abroad an aircraft?",
    options: [
      "In an emergency or if the person is a medical patient under proper care.",
      "Only if the person does not have access to the cockpit or pilot’s compartment.",
      "Under no condition."
    ],
    answer: "A"
  },
  {
    q: "16. Preflight action, as required for all flights away from the of an airport, shall include:",
    options: [
      "the designation of an alternate airport.",
      "a study of arrival procedures at airports/heliports of intended use.",
      "an alternate course of action if the flight cannot be completed as planned."
    ],
    answer: "C"
  },
  {
    q: "17. In addition to other preflight actions for a VFR flight away from the vicinity of the departure airport, regulations specifically require the pilot in command to:",
    options: [
      "review traffic control light signal procedures.",
      "check the accuracy of the navigation equipment and the emergency locator transmitter (ELT).",
      "determine runway lengths at airports of intended use and the aircraft’s takeoff and landing distance data."
    ],
    answer: "C"
  },
  {
    q: "18. Which preflight action is specifically required of the pilot prior to each flight?",
    options: [
      "Check the aircraft logbooks for appropriate entries.",
      "Become familiar with available information concerning the flight.",
      "Review wake turbulence avoidance procedures."
    ],
    answer: "B"
  },
  {
    q: "19. Flight crewmembers are required to keep their safety belts and shoulder harnesses fastened during:",
    options: [
      "takeoff and landings.",
      "all flight conditions.",
      "flight in turbulent air."
    ],
    answer: "A"
  },
  {
    q: "20. No person may operate an aircraft in formation flight:",
    options: [
      "over a densely populated area.",
      "in class D airspace under special VFR.",
      "except by prior arrangement with the pilot in command of each aircraft."
    ],
    answer: "C"
  },
  {
    q: "21. An airplane and an airship are converging. If the airship is left of the airplane’s position, which aircraft has the right-of-way?",
    options: [
      "The airship.",
      "The airplane.",
      "Each pilot should alter course to the right."
    ],
    answer: "A"
  },
  {
    q: "22. When two or more aircraft are approaching an airport for the purpose of landing, the right-of-way belongs to the aircraft:",
    options: [
      "that has the other to its right.",
      "that is the least maneuverable.",
      "at the lower altitude, but it shall not take advantage of this rule to cut in front of or to overtake another."
    ],
    answer: "C"
  },
  {
    q: "23. What action should the pilots of a glider and an airplane take if on a head-on collision course?",
    options: [
      "The airplane pilots should give way to the left.",
      "The glider pilot should give way to the right.",
      "Both pilots should give way to the right."
    ],
    answer: "C"
  },
  {
    q: "24. What action is required when two aircraft of the same category converge, but not head-on?",
    options: [
      "The faster aircraft shall give way.",
      "The aircraft on the left shall give way.",
      "Each aircraft shall give way to the right."
    ],
    answer: "B"
  },
  {
    q: "25. Which aircraft has the right-of-way over all other air traffic?",
    options: [
      "A balloon.",
      "An aircraft in distress.",
      "An aircraft on final approach to land."
    ],
    answer: "B"
  },
  {
    q: "26. Except when necessary for takeoff or landing, what is the minimum safe altitude for a pilot to operate an aircraft anywhere?",
    options: [
      "An altitude allowing, if a power unit fails, an emergency landing without undue hazard to persons or property on the surface.",
      "An altitude of 500 feet above the surface and no closer than 500 feet to any person, vessel, vehicle, or structure.",
      "An altitude of 500 feet above the highest obstacle within a horizontal radius of 1,000 feet."
    ],
    answer: "A"
  },
  {
    q: "27. What is the specific fuel requirement for flight under VFR at night in an airplane?",
    options: [
      "Enough to complete the flight at normal cruising speed with adverse wind conditions.",
      "Enough to fly to the first point of intended landing and to fly after that for 30 minutes at normal cruising speed.",
      "Enough to fly to the first point of intended landing and to fly after that for 45 minutes at normal cruising speed."
    ],
    answer: "C"
  },
  {
    q: "28. What is the specific fuel requirement for flight under VFR during daylight hours in an airplane?",
    options: [
      "Enough to complete the flight at normal cruising speed with adverse wind conditions.",
      "Enough to fly to the first point of intended landing and to fly after that for 30 minutes at normal cruising speed.",
      "Enough to fly to the first point of intended landing and fly after that for 45 minutes at normal cruising speed."
    ],
    answer: "B"
  },
  {
    q: "29. Which cruising altitude is appropriate for a VFR flight on a magnetic course of 135°?",
    options: [
      "4,500 feet.",
      "5,000 feet.",
      "5,500 feet."
    ],
    answer: "C"
  },
  {
    q: "30. Which VFR cruising altitude is appropriate when flying above 3,000 feet AGL on a magnetic course of 185°?",
    options: [
      "4,000 feet.",
      "4,500 feet.",
      "5,000 feet."
    ],
    answer: "B"
  },
  {
    q: "31. When two or more aircraft are approaching an airport for the purpose of landing, the right-of-way belongs to the aircraft:",
    options: [
      "that has the other to its right.",
      "at the lower altitude, but it shall not take advantage of this rule to cut in front of or to overtake another",
      "that is the least maneuverable."
    ],
    answer: "B"
  },
  {
    q: "32. With respect to the certification of airmen, which is a category of aircraft?",
    options: [
      "Airplane, rotorcraft, glider, lighter-than-air.",
      "Gyroplane, rotorcraft, airship, Free balloon.",
      "Single-engine land and sea, multi-engine land and sea."
    ],
    answer: "A"
  },
  {
    q: "33. The responsibility for ensuring that an aircraft is maintained in an airworthy condition is primarily that of the:",
    options: [
      "owner or operator",
      "pilot-in-command",
      "mechanic who performs the work."
    ],
    answer: "A"
  },
  {
    q: "34. In which type of airspace are VFR flights prohibited?",
    options: [
      "Class A",
      "Class B",
      "Class C"
    ],
    answer: "A"
  },
  {
    q: "35. During the preflight inspection who is responsible for determining the aircraft in safe for flight?",
    options: [
      "The owner or operator",
      "The pilot-in-command.",
      "The certificated mechanic who performed the annual inspection"
    ],
    answer: "B"
  }
];

const PPL_FLIGHT_PERFORMANCE_PLANNING_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. The four forces acting on an airplane in-flight are:",
    options: [
      "lift, weight, thrust, and drag.",
      "lift, weight, gravity, and thrust.",
      "lift, weight, gravity, power, and friction"
    ],
    answer: "A"
  },
  {
    q: "2. (Refer to figure 38.) Determine the approximate total distance required to land\n\nOver a 50-foot obstacle.\nOAT..................90°F\nPressure ............. 4,000 Feet\nWeight ....................2,800 pounds\nHeadwind component ..10knots",
    options: [
      "1,525 feet",
      "1,950 feet",
      "1,775 feet"
    ],
    answer: "C"
  },
  {
    q: "3. To minimize the side loads placed on the landing gear during touchdown, the pilot should keep:",
    options: [
      "direction of motion of the aircraft parallel to the runway.",
      "down wing lowered sufficiently to eliminate the tendency for the aircraft to drift.",
      "longitudinal axis of the aircraft parallel to the direction of its motion."
    ],
    answer: "C"
  },
  {
    q: "4. (Refer to figure 41) Determine the total distance required for takeoff to clear a 50-foot obstacle.\n\nOAT..............................Std\nPressure ............. ........4,000 Feet\nTakeoff Weight .............2,800 pounds\nHeadwind component ....Calm",
    options: [
      "1,500 feet",
      "2,000 feet",
      "1,750 feet"
    ],
    answer: "C"
  },
  {
    q: "5. If an altimeter setting is not available before flight, to which altitude should the pilot adjust the altimeter?",
    options: [
      "The elevation of the nearest airport corrected to mean sea level.",
      "The elevation of the departure area.",
      "Pressure altitude corrected for nonstandard."
    ],
    answer: "B"
  },
  {
    q: "6. Loading an airplane to the most aft CG will cause the airplane to be:",
    options: [
      "less stable at slow speeds, but more stable at high speeds.",
      "less stable at high speeds, but more stable at low speeds.",
      "less stable at all speed."
    ],
    answer: "C"
  },
  {
    q: "7. GIVEN:\nWEIGHT MOMENT ARM\nEmpty Weight 1495 151593 101.4\nPilot and pax 380 64\n(AVGAS)\nFuel (30 gal Usable no reserve) 96\n\nThe CG is located how far to the aft of datum?",
    options: [
      "CG 94.01",
      "CG 92.44",
      "CG 119.8"
    ],
    answer: "A"
  },
  {
    q: "8. If it is necessary to set the altimeter from 29.15 to 29.85, what change occurs?",
    options: [
      "700-foot increase in indicated altitude.",
      "70-foot increase in indicated altitude.",
      "70-foot increase in density altitude."
    ],
    answer: "A"
  },
  {
    q: "9. The angle of attack at which an airplane wing will stalls:",
    options: [
      "increase if the CG is moved forward",
      "remain the same regardless of gross weight.",
      "change with an increase in gross weight."
    ],
    answer: "B"
  },
  {
    q: "10. When computing weight and balance, the basic empty weight includes the weight of the airframe, engine(s), and all installed optional equipment. Basic empty weight also includes?",
    options: [
      "The unusable fuel, full operating fluids, and full oil",
      "All usable fuel, full oil, hydraulic fluid, but does not include the weight of pilot, passengers, or baggage",
      "All usable fuel and oil, but does not include any radio equipment or instruments that were installed by someone other than the manufacturer"
    ],
    answer: "A"
  },
  {
    q: "11. (Refer to figure 31) If the tower-reported surface wind is 010° at 18 knots, what is the crosswind component for a Rwy 08 landing?",
    options: [
      "7 knots",
      "15 knots",
      "17 knots"
    ],
    answer: "C"
  },
  {
    q: "12. (Refer to figure 11) If the cruise altitude is 7,500 feet, using 64 percent power at 2,500 RPM, what would be the range with 48 gallons of usable fuel?",
    options: [
      "635 miles",
      "645 miles",
      "810 miles"
    ],
    answer: "C"
  },
  {
    q: "13. (Refer to figure 11) What would be the endurance at an altitude of 7,500 feet, using 52 percent power?\nNOTE: with 48gallons of fuel – no reserve",
    options: [
      "6.1 hours",
      "7.7 hours",
      "8.0 hours"
    ],
    answer: "B"
  },
  {
    q: "14. (Refer to figure 11) What would be the approximate true airspeed and fuel consumption per hour at an altitude of 7,500 feet, using 52 percent power?",
    options: [
      "103 MPH TAS, 6.3 GPH",
      "105 MPH TAS, 6.6 GPH",
      "105 MPH TAS, 6.2 GPH"
    ],
    answer: "C"
  },
  {
    q: "15. The CG of an aircraft can be determine by which of the following method’s?",
    options: [
      "Dividing total arms by total moments",
      "Multiplying total arms by total weight",
      "Dividing total moments by total weight"
    ],
    answer: "C"
  },
  {
    q: "16. The CG of an aircraft may be determined by:",
    options: [
      "dividing total arms by total moments",
      "dividing total moments by total weight",
      "multiplying total weight by total moments"
    ],
    answer: "B"
  },
  {
    q: "17. If all index units are positive when computing weight and balance, the location of the datum would be at the:",
    options: [
      "centerline of the main wheels",
      "nose, or out in front of the airplane",
      "centerline of the nose or tailwheel, depending on the type of airplane"
    ],
    answer: "B"
  },
  {
    q: "18. (Refer to figure 9) Using a normal climb, how much fuel would be used from engine start to 12,000 feet pressure altitude?\nAircraft weight.................................3,800 lb\nAirport pressure altitude..................4,000 ft\nTemperature.................................26° C",
    options: [
      "46 pounds",
      "51 pounds",
      "58 pounds"
    ],
    answer: "C"
  },
  {
    q: "19. (Rfer to figure 14) GIVEN:\nAircraft weight..........................................3,700 lb\nAirport pressure altitude.........................4,000 ft\nTemperature at 4,000 ft..........................21° C\nUsing a normal climb under the given conditions, how much fuel would be used from engine start to a pressure altitude of 12,000 ft.?",
    options: [
      "30 pounds",
      "37 pounds",
      "46 pounds"
    ],
    answer: "C"
  },
  {
    q: "20. What effect does an uphill runway slope have on takeoff performance?",
    options: [
      "Increase takeoff speed",
      "Increase takeoff distance",
      "Decrease takeoff distance"
    ],
    answer: "B"
  }
];

const PPL_HUMAN_PERFORMANCE_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. During a night flight, you observe a steady red light and a flashing red light ahead and at the same altitude. What is the general direction of movement of the other aircraft?",
    options: [
      "The other aircraft is crossing to the left.",
      "The other aircraft is crossing to the right.",
      "The other aircraft is approaching head-on."
    ],
    answer: "A"
  },
  {
    q: "2. During a night flight, you observe steady red and green lights ahead and at the same altitude. What is the general direction of movement of the other aircraft?",
    options: [
      "The other aircraft is crossing to the left.",
      "The other aircraft is flying away from you.",
      "The other aircraft is approaching head-on."
    ],
    answer: "C"
  },
  {
    q: "3. During a night flight, you observe a steady white light and a flashing red light ahead and at the same altitude. What is the general direction of movement of the other aircraft?",
    options: [
      "The other aircraft is flying away from you.",
      "The other aircraft is crossing to the left.",
      "The other aircraft is crossing to the right."
    ],
    answer: "A"
  },
  {
    q: "4. What is the most effective way to use the eyes during night flight?",
    options: [
      "Look only at far away, dim lights.",
      "Scan slowly to permit off center viewing.",
      "Concentrate directly on each object for a few seconds."
    ],
    answer: "B"
  },
  {
    q: "5. The best method to use when looking for other traffic at night is to",
    options: [
      "Look to the side of the object and scan slowly.",
      "Scan the visual field very rapidly.",
      "Look to the side of the object and scan rapidly."
    ],
    answer: "A"
  },
  {
    q: "6. The most effective method of scanning for other aircraft for collision avoidance during nighttime hours is to use",
    options: [
      "Regularly spaced concentration on the 3-, 9-, and 12-o'clock positions.",
      "A series of short regularly spaced eye movements to search each 30-degree sector.",
      "Peripheral vision by scanning small sectors and utilizing off center viewing."
    ],
    answer: "C"
  },
  {
    q: "7. Large accumulations of carbon monoxide in the human body result in",
    options: [
      "Tightness across the forehead.",
      "Loss of muscular power.",
      "An increased sense of well-being."
    ],
    answer: "B"
  },
  {
    q: "8. Susceptibility to carbon monoxide poisoning increases as",
    options: [
      "Altitude increases.",
      "Altitude decreases.",
      "Air pressure increases."
    ],
    answer: "A"
  },
  {
    q: "9. Which statement best defines hypoxia?",
    options: [
      "A state of oxygen deficiency in the body.",
      "An abnormal increase in the volume of air breathed.",
      "A condition of gas bubble formation around the joints or muscles."
    ],
    answer: "A"
  },
  {
    q: "10. The most effective method of scanning for other aircraft for collision avoidance during daylight hours is to use",
    options: [
      "Regularly spaced concentration on the 3-, 9-, and 12-o'clock positions.",
      "A series of short regularly spaced eye movements to search each 10-degree sector.",
      "Peripheral vision by scanning small sectors and utilizing off center viewing."
    ],
    answer: "B"
  },
  {
    q: "11. Rapid or extra deep breathing while using oxygen can cause a condition known as",
    options: [
      "Hyperventilation.",
      "Aero sinusitis.",
      "Aerotitis."
    ],
    answer: "A"
  },
  {
    q: "12. Which technique should a pilot use to scan for traffic to the right and left during straight-and-level flight?",
    options: [
      "Systematically focus on different segments of the sky for short intervals.",
      "Concentrate on relative movement detected in the peripheral vision area.",
      "Continuous sweeping of the windshield from right to left."
    ],
    answer: "A"
  },
  {
    q: "13. How can you determine if another aircraft is on a collision course with your aircraft?",
    options: [
      "The other aircraft will always appear to get larger and closer at a rapid rate.",
      "The nose of each aircraft is pointed at the same point in space.",
      "There will be no apparent relative motion between your aircraft and the other aircraft."
    ],
    answer: "C"
  },
  {
    q: "14. If a pilot experiences spatial disorientation during flight in a restricted visibility condition, the best way to overcome the effect is to",
    options: [
      "Rely upon the aircraft instrument indications.",
      "Concentrate on yaw, pitch, and roll sensations.",
      "Consciously slow the breathing rate until symptoms clear and then resume normal breathing rate."
    ],
    answer: "A"
  },
  {
    q: "15. Pilots are more subject to spatial disorientation if",
    options: [
      "They ignore the sensations of muscles and inner ear.",
      "Body signals are used to interpret flight attitude.",
      "Eyes are moved often in the process of cross-checking the flight instruments."
    ],
    answer: "B"
  },
  {
    q: "16. The danger of spatial disorientation during flight in poor visual conditions may be reduced by",
    options: [
      "Shifting the eyes quickly between the exterior visual field and the instrument panel.",
      "Having faith in the instruments rather than taking a chance on the sensory organs.",
      "Leaning the body in the opposite direction of the motion of the aircraft."
    ],
    answer: "B"
  },
  {
    q: "17. A person may not act as a crewmember of a civil aircraft if alcoholic beverages have been consumed by that person within the preceding",
    options: [
      "8 hours.",
      "12 hours.",
      "24 hours."
    ],
    answer: "A"
  },
  {
    q: "18. Which is true regarding the presence of alcohol within the human body?",
    options: [
      "A small amount of alcohol increases vision acuity.",
      "An increase in altitude decreases the adverse effect of alcohol.",
      "Judgment and decision-making abilities can be adversely affected by even small amounts of alcohol."
    ],
    answer: "C"
  },
  {
    q: "19. Hypoxia is the result of which of these conditions?",
    options: [
      "Excessive oxygen in the bloodstream.",
      "Insufficient oxygen reaching the brain.",
      "Excessive carbon dioxide in the bloodstream."
    ],
    answer: "B"
  },
  {
    q: "20. Why is hypoxia particularly dangerous during flights with one pilot?",
    options: [
      "Night vision may be so impaired that the pilot cannot see other aircraft.",
      "Symptoms of hypoxia may be difficult to recognize before the pilot's reactions are affected.",
      "The pilot may not be able to control the aircraft even if using oxygen."
    ],
    answer: "B"
  },
  {
    q: "21. Which statement is correct regarding the use of cockpit lighting for night flight?",
    options: [
      "Reducing the lighting intensity to a minimum level will eliminate blind spots.",
      "The use of regular white light, such as a flashlight, will impair night adaptation.",
      "Coloration shown on maps is least affected by the use of direct red lighting."
    ],
    answer: "A"
  },
  {
    q: "22. What action should be taken if hyperventilation is suspected?",
    options: [
      "Breathe at a slower rate by taking very deep breaths.",
      "Consciously breathe at a slower rate than normal.",
      "Consciously force yourself to take deep breaths and breathe at a faster rate than normal."
    ],
    answer: "B"
  },
  {
    q: "23. How can an instrument pilot best overcome spatial disorientation?",
    options: [
      "Use a very rapid cross check.",
      "Properly interpret the flight instruments and act accordingly.",
      "Avoid banking in excess of 30°."
    ],
    answer: "B"
  },
  {
    q: "24. Which would most likely result in Hyperventilation?",
    options: [
      "Emotional tension, anxiety or fear.",
      "The excessive consumption of alcohol.",
      "An extremely slow rate of breathing and insufficient oxygen."
    ],
    answer: "A"
  },
  {
    q: "25. A pilot should be able to overcome the symptoms or avoid future occurrences of hyperventilation by",
    options: [
      "Closely monitoring the flight instruments to control the airplane.",
      "Slowing the breathing rate, breathing into a bag, or talking aloud.",
      "Increasing the breathing rate in order to increase lung ventilation."
    ],
    answer: "B"
  },
  {
    q: "26. The danger of spatial disorientation during flight in poor visual conditions may be reduced by",
    options: [
      "Shifting the eyes quickly between the exterior visual field and the instrument panel",
      "Having faith in the instruments rather than taking a chance on the sensory organs.",
      "Leaning the body in the opposite direction of the motion of the aircraft."
    ],
    answer: "B"
  },
  {
    q: "27. A state of temporary confusion resulting from misleading information being sent to the brain by various sensory organs is defined as",
    options: [
      "Spatial disorientation",
      "Hyperventilation",
      "Hypoxia"
    ],
    answer: "A"
  },
  {
    q: "28. What effect does haze have on the ability to see traffic or terrain features during flight?",
    options: [
      "Haze causes the eyes to focus at infinity.",
      "The eyes tend to overwork in haze and do not detect relative movement easily.",
      "All traffic or terrain features appear to be farther away than their actual distance."
    ],
    answer: "C"
  },
  {
    q: "29. What preparation should a pilot make to adapt the eyes for night flying?",
    options: [
      "Wear sunglasses after sunset until ready for flight.",
      "Avoid red light up to 30 minutes before the flight.",
      "Avoid bright white lights at least 30 minutes before the flight."
    ],
    answer: "C"
  },
  {
    q: "30. Hypoxia susceptibility due to inhalation of carbon monoxide increases as",
    options: [
      "Humidity decreases.",
      "Altitude decreases.",
      "Oxygen demand increases."
    ],
    answer: "C"
  },
  {
    q: "31. Which is a common symptom of hyperventilation?",
    options: [
      "Drowsiness.",
      "Decreased breathing rate.",
      "Euphoria- sense of well-being."
    ],
    answer: "C"
  },
  {
    q: "32. As hyperventilation progresses a pilot can experience",
    options: [
      "Decreased breathing rate and depth.",
      "Heightened awareness and feeling of well-being.",
      "Symptoms of suffocation and drowsiness."
    ],
    answer: "B"
  },
  {
    q: "33. To overcome the symptoms of hyperventilation, a pilot should",
    options: [
      "Swallow or yawn.",
      "Slow the breathing rate.",
      "Increase the breathing rate."
    ],
    answer: "B"
  },
  {
    q: "34. Which would most likely result in hyperventilation?",
    options: [
      "Insufficient oxygen.",
      "Excessive carbon monoxide.",
      "Insufficient carbon dioxide."
    ],
    answer: "C"
  },
  {
    q: "35. To best overcome the effects of spatial disorientation, a pilot should",
    options: [
      "Rely on the body sensations.",
      "Increase the breathing rate.",
      "Rely on aircraft instrument indications."
    ],
    answer: "C"
  },
  {
    q: "36. To scan properly for traffic, a pilot should",
    options: [
      "Continuously sweep vision field.",
      "Concentrate on any peripheral movement detected.",
      "Systematically focus on different segments of vision field for short intervals."
    ],
    answer: "C"
  },
  {
    q: "37. A pilot is more subject to spatial disorientation if",
    options: [
      "Kinesthetic senses are ignored.",
      "Eyes are moved often in the process of cross-checking the flight instruments.",
      "Body signals are used to interpret flight instruments."
    ],
    answer: "C"
  },
  {
    q: "38. Abrupt head movement during a prolonged constant rate turn in the IMC or simulated instrument conditions can cause",
    options: [
      "Pilot disorientation.",
      "False horizon.",
      "Elevator illusion."
    ],
    answer: "A"
  },
  {
    q: "39. Without visual aid, pilot often interprets centrifugal force as a sensation of",
    options: [
      "Rising or falling.",
      "Turning.",
      "Motion reversal."
    ],
    answer: "B"
  },
  {
    q: "40. An abrupt change from climb to straight-and-level flight can create the illusion of",
    options: [
      "Tumbling backwards.",
      "A nose up attitude.",
      "A descent with the wings level."
    ],
    answer: "A"
  },
  {
    q: "41. A rapid acceleration during takeoff can create the illusion of",
    options: [
      "Spinning in the opposite direction.",
      "Being in a nose up attitude.",
      "Diving into the ground."
    ],
    answer: "B"
  },
  {
    q: "42. A slopping cloud formation, an obscured horizon, and a dark scene spread with ground lights and stars can create an illusion known as",
    options: [
      "Elevator illusions.",
      "Auto kinesis.",
      "False horizons."
    ],
    answer: "C"
  },
  {
    q: "43. Due to visual illusion, when landing on a narrower-than-usual runway, the aircraft will appear to be",
    options: [
      "Higher than actual, leading to a lower-than-normal approach.",
      "Lower than actual, leading to a higher-than-normal approach.",
      "Higher than actual, leading to a higher-than-normal approach."
    ],
    answer: "A"
  },
  {
    q: "44. What visual illusion creates the same effect as a narrower-than-usual runway?",
    options: [
      "An up sloping runway.",
      "A wider-than-usual runway.",
      "A down sloping runway."
    ],
    answer: "B"
  },
  {
    q: "45. It can take up to ___ hours for the body to dispose of carbon monoxide.",
    options: [
      "10 hours",
      "24 hours",
      "48 hours"
    ],
    answer: "C"
  },
  {
    q: "46. The only medicine found safe for flying if taken at minimal dosage are:",
    options: [
      "Aspirin and antacids",
      "Analgesics and Anesthetics",
      "Decongestants and Antihistamines"
    ],
    answer: "A"
  },
  {
    q: "47. Flashing lights inside clouds during night time can induce:",
    options: [
      "Inversion illusion",
      "Flicker vertigo",
      "Coriolis illusion"
    ],
    answer: "B"
  },
  {
    q: "48. Hazardous attitude which contribute to poor pilot judgement can be effectively counteracted by:",
    options: [
      "Early recognition of hazardous thoughts",
      "Taking meaningful steps to be more assertive with attitudes",
      "Redirecting that hazardous attitudes so that appropriate action can be taken"
    ],
    answer: "C"
  },
  {
    q: "49. What does good cockpit stress management begin with:",
    options: [
      "Knowing what causes stress",
      "Eliminating life and cockpit stress issues",
      "Good life stress management"
    ],
    answer: "C"
  },
  {
    q: "50. When a pilot recognized a hazardous thought, he or she then should correct it by stating the corresponding antidote, which of the following is the antidote for ANTIAUTHORITY:",
    options: [
      "Not so fast, Think first",
      "It won’t happen to me. It could happen to me",
      "Don’t tell me. Follow the rules. They are usually right"
    ],
    answer: "C"
  },
  {
    q: "51. Aeronautical Decision Making (ADM) is a:",
    options: [
      "Systematic approach to the mental process used by pilots to consistently determine the best course of action for a given set of circumstances",
      "Decision making process which relies on good judgement to reduce risks associated with each flight",
      "Mental process of analyzing all information in a particular situation and making a timely decision on what action to take"
    ],
    answer: "A"
  },
  {
    q: "52. What should a pilot do when recognizing a thought as hazardous:",
    options: [
      "Avoid developing this hazardous thought",
      "Develop this hazardous thought and follow through with modified action",
      "Label that thought as hazardous, then correct that thought by stating the corresponding learned antidote"
    ],
    answer: "C"
  },
  {
    q: "53. The aeronautical Decision Making (ADM) process identifies the steps involved in good decision making. One of these steps includes a pilot:",
    options: [
      "Making a rational evaluation of the required actions",
      "Developing the “right stuff” attitude",
      "Identifying personal attitudes hazardous to safe flight"
    ],
    answer: "C"
  }
];

const CPL_NAVIGATION_QUESTIONS: ExamQuestion[] = [
    {
      q: "1. To track inbound on the 215 radial of a VOR station, the recommended procedure is to set the OBS to:",
      options: [
        "035 and make heading corrections toward the CDI needle.",
        "215 and make heading corrections toward the CDI needle.",
        "215 and make corrections away from the CDI needle."
      ],
      answer: "A"
    },
    {
      q: "2. (Refer to figure 17). Which is true regarding illustration 4, if the present heading is maintained? The airplane will...",
      options: [
        "Intercept the 240 radial at a radial 30° angle.",
        "Cross the 180 radial at a 75° angle.",
        "Cross the 060° radial at a 15° angle."
      ],
      answer: "B"
    },
    {
      q: "3. (Refer to figure 17). Which illustration indicates that the airplane should be turned 150° left to intercept the 360° radial at a 60° angle inbound?",
      options: [
        "2",
        "3",
        "1"
      ],
      answer: "C"
    },
    {
      q: "4. (Refer to figure 17). Which statement is true regarding illustration 2, if the present heading is maintained? The airplane will...",
      options: [
        "Intercept the 225 radial at 45° angle.",
        "Intercept the 360° radial at a 45° angle inbound.",
        "Cross the 180 radial at a 45° angle outbound."
      ],
      answer: "C"
    },
    {
      q: "5. (Refer to figure 17). Which illustration indicates that the airplane will intercept the 060 radial at a 60° angle inbound, if the present heading is maintained?",
      options: [
        "4",
        "5",
        "6"
      ],
      answer: "C"
    },
    {
      q: "6. (Refer to figure 17). Which illustration indicates that the airplane will intercept the 060 radial at a 75° angle outbound, if the present heading is maintained?",
      options: [
        "5",
        "6",
        "4"
      ],
      answer: "A"
    },
    {
      q: "7. Assume that the pilot is flying outbound on the 090° radial of a VOR with no-wind condition. He is flying on a...",
      options: [
        "True heading of 270°",
        "True heading 090°",
        "Magnetic heading of 090°"
      ],
      answer: "C"
    },
    {
      q: "8. (Refer to figure 20). Which instrument shows the aircraft to be northwest of the VORTAC?",
      options: [
        "1",
        "3",
        "2"
      ],
      answer: "C"
    },
    {
      q: "9. (Refer to figure 20) Which instrument shows the aircraft in a position where a straight course after a 90° left turn would result in intercepting radial 135?",
      options: [
        "Instrument 1",
        "Instrument 2",
        "Instrument 3",
        "Instrument 4"
      ],
      answer: "C"
    },
    {
      q: "10. The lateral dimensions of the airways are __________ within 57.15 NM from the radio navigation facility, after which the lateral boundaries splay out at an angle of 5° until a maximum width.",
      options: [
        "15 NM",
        "5 NM",
        "10 NM"
      ],
      answer: "C"
    },
    {
      q: "11. How should the pilot make a VOR receiver check when the aircraft is located on the designated checkpoint on the airport surface?",
      options: [
        "With the aircraft headed directly toward the VOR and the OBS set to 0° the CDI should center within plus or minus 4° of that radial with a to indication.",
        "Set the OBS on 180° plus or minus 4°, the CDI should center with a FROM indication.",
        "Set the OBS on the designated radial. The CDI must center within plus or minus 4° of that radial with a FROM indication."
      ],
      answer: "C"
    },
    {
      q: "12. To fly inbound on the 270° radial of a VOR, the OBS (Omni Bearing Selector) should be set to...",
      options: [
        "270° TO",
        "090° TO",
        "090° FROM"
      ],
      answer: "A"
    },
    {
      q: "13. (Refer to figure 20). Which instrument shows the aircraft in a position where a 180° turn would result in the aircraft intercepting the 150 radial at a 30°angle?",
      options: [
        "4",
        "2",
        "3"
      ],
      answer: "A"
    },
    {
      q: "14. (Refer to figure 20) Which instrument shows the aircraft in a position where a straight course after a 90° left turn would result in intercepting the 180° radial?",
      options: [
        "4",
        "2",
        "3"
      ],
      answer: "C"
    },
    {
      q: "15. GIVEN:\nAssociated conditions...Fig. 20\nTemperature...75° F\nPressure altitude...6,000 ft.\nWeight...2,900 lb.\nHeadwind...20 kts.\n\nWhat weight reduction is necessary to take-off over a 50-foot obstacle in 1,000 ft.?",
      options: [
        "100 lb.",
        "200 lb.",
        "300 lb.",
        "400 lb."
      ],
      answer: "C"
    },
    {
      q: "16. GIVEN:\nAssociated conditions...Fig. 20\nTemperature...30° F\nPressure altitude...6,000 ft.\nWeight...3,300 lb.\nHeadwind...20 kts.\n\nWhat is the total take-off distance over a 50- foot obstacle?",
      options: [
        "1,200 ft.",
        "1,300 ft.",
        "1,400 ft.",
        "1,500 ft."
      ],
      answer: "D"
    },
    {
      q: "17. GIVEN:\nAssociated conditions...Fig. 20\nTemperature...100°\nPressure altitude...4,000 ft.\nWeight...3,200 lb.\nHeadwind...calm\n\nWhat is the ground roll required for take-off over a 50-foot obstacle?",
      options: [
        "1,350 ft.",
        "1,180 ft.",
        "1,540 ft.",
        "1,850 ft."
      ],
      answer: "A"
    },
    {
      q: "18. GIVEN:\nAssociated conditions...Fig. 20\nTemperature...50° F\nPressure Altitude...Sea level\nWeight...2,700 lb.\nHeadwind...Calm\n\nWhat is the total take-off distance over a 50- foot obstacle?",
      options: [
        "450 ft.",
        "550 ft.",
        "750 ft.",
        "650 ft."
      ],
      answer: "C"
    },
    {
      q: "19. The cruising levels at which a flight or a portion of a flight is to be conducted shall be in terms of...",
      options: [
        "Altitudes for flight below the lowest usable flight level or where applicable, at or below the transition altitude.",
        "Flight levels for flight at or above the lowest usable flight levels or, where applicable, above the transition altitude.",
        "A and B are correct."
      ],
      answer: "C"
    },
    {
      q: "20. When diverting to an alternate airport because of an emergency, pilots should...",
      options: [
        "Apply rule-of-thumb computations, estimates, and other appropriate shortcuts to divert to the new course as soon as possible.",
        "Climb to a higher altitude because it will be easier to identify checkpoints.",
        "Rely on as the primary method of navigation."
      ],
      answer: "A"
    },
    {
      q: "21. (Refer to figure 22). If the time flown between aircraft position 2 and 3 is 8 minutes, what is the estimated time to the station?",
      options: [
        "48 minutes",
        "8 minutes",
        "16 minutes"
      ],
      answer: "B"
    },
    {
      q: "22. (Refer to figure 23).If the time flown between aircraft position 2 and 3 is 13 minutes, what is the estimated time to the station?",
      options: [
        "13 minutes",
        "26 minutes",
        "7.8 minutes"
      ],
      answer: "A"
    },
    {
      q: "23. (Refer to figure 24). If the time flown between aircraft position 2 and 3 is 15 minutes, what is the estimated time to the station?",
      options: [
        "60 minutes",
        "15 minutes"
      ],
      answer: "B"
    },
    {
      q: "24. To track inbound on the 215 radial VOR station, the recommended procedure is to set the OBS to:",
      options: [
        "035° and make heading corrections toward the CDI needle.",
        "215° and make heading corrections toward the CDI needle.",
        "035° and make heading corrections away from the CDI needle."
      ],
      answer: "A"
    },
    {
      q: "25. Which is true regarding the use of a standard instrument departure (SID) chart?",
      options: [
        "To use a SID, the pilot must possess at least the textual description of the approved standard departure.",
        "To use a SID, the pilot must possess both textual and graphic form of the approved standard departure.",
        "At airfield where SID's have been established, SID usage is mandatory for IFR departures."
      ],
      answer: "B"
    },
    {
      q: "26. Using a normal climb, how much fuel would be used from engine start to 10,000 ft. pressure altitude? (See Figure 25)\n\nWeight...3,500 lb.\nAirport pressure altitude...4,000 ft.\nTemperature...21° C",
      options: [
        "23 lb.",
        "20 lb.",
        "31 lb.",
        "35 lb."
      ],
      answer: "D"
    },
    {
      q: "27. Using a normal climb, how much fuel would be used from engine start to 12,000 ft. pressure altitude? (See Figure 25)\n\nWeight...3,800 lb.\nAirport pressure altitude...4,000 ft.\nTemperature...26° C",
      options: [
        "46 lb.",
        "58 lb.",
        "39 lb.",
        "51 lb."
      ],
      answer: "B"
    },
    {
      q: "28. Using a normal climb, how much fuel would be used from engine start to 8,000 ft. pressure altitude? (See Figure 25)\n\nWeight...3,800 lb.\nAirport pressure altitude...2,000 ft.\nTemperature...28° C",
      options: [
        "24 lb.",
        "36 lb.",
        "27 lb.",
        "21 lb."
      ],
      answer: "B"
    },
    {
      q: "29. An aircraft 60 miles from VOR station has a CDI indication of one fifth deflection, this represents a course centerline deviation of approximately:",
      options: [
        "1 mile",
        "6 miles",
        "2 miles"
      ],
      answer: "C"
    },
    {
      q: "30. When making an instrument approach at the selected alternate airport, what landing minimums apply?",
      options: [
        "The landing minimums published for the type of procedure selected.",
        "The IFR alternate minimums listed for that airport.",
        "Standard alternate minimums."
      ],
      answer: "A"
    },
    {
      q: "31. In routes which expand with angular divergence of 5° from the two navigational aids where the route is declared, the ________ buffer zone from both edges of the route is maintained throughout the routes maximum width.",
      options: [
        "10 NM",
        "15 NM",
        "5 NM"
      ],
      answer: "C"
    },
    {
      q: "32. Prominent high features on the map are indicated on an aviation chart by...",
      options: [
        "Double purple lines",
        "Double red lines",
        "Single blue lines"
      ],
      answer: "B"
    },
    {
      q: "33. GIVEN:\nWingtip bearing change...............................................5°\nElapsed time between bearing change............................6 min\nRate of fuel consumption............................................12 gal/hr\n\nThe fuel required to fly the station is:",
      options: [
        "14.4 gallons",
        "18.7 gallons",
        "8.2 gallons"
      ],
      answer: "A"
    },
    {
      q: "34. To track outbound on the 180 radial of a VOR station, the recommended procedure is to set the OBS to:",
      options: [
        "180° and make heading corrections away from the CDI needle.",
        "180° and make heading corrections toward the CDI needle.",
        "360° and make heading corrections toward the CDI needle."
      ],
      answer: "B"
    },
    {
      q: "35. An airplane departs an airport under the following conditions:\nAirport elevation................................2,300 ft.\nTo cruise at.......................................10,500 ft.\nRate of climb......................................600 ft./min\nAverage true airspeed.........................130 kts.\nTrue course........................................305°\nAverage wind velocity.........................260° at 25 kts\nVariation............................................4°E\nDeviation............................................+3°\nAverage fuel consumption....................13 gal./hr.\n\nDetermine the approximate time, compass heading, distance, and fuel consumed during the climb.",
      options: [
        "16 min., 296°, 25 NM, 3.4 gal",
        "16 min., 292°, 23 NM, 3.0 gal.",
        "16 min., 296°, 23 NM, 3.0 gal.",
        "14 min., 296°, 25 NM, 3.0 gal."
      ],
      answer: "D"
    },
    {
      q: "36. An airplane departs an airport under the following conditions:\nAirport elevation................................900 ft.\nTo cruise at.......................................8,500 ft.\nRate of climb......................................500 ft./min\nAverage true airspeed.........................130 kts.\nTrue course........................................220°\nAverage wind velocity.........................300° at 30 kts.\nVariation............................................3° W\nDeviation............................................ - 2°\nAverage fuel consumption....................14 gal./hr.\n\nDetermine the approximate time, compass heading, distance, and fuel consumed during the climb.",
      options: [
        "15 min., 234°, 26 NM, 3.9 gal.",
        "15 min., 234°, 31 NM, 4.2 gal.",
        "15 min., 242°, 31 NM, 3.5 gal.",
        "15 min., 234°, 31 NM, 3.5 gal."
      ],
      answer: "D"
    },
    {
      q: "37. Which maximum range factor decreases as weight decreases?",
      options: [
        "Angle of attack",
        "Altitude",
        "Airspeed"
      ],
      answer: "C"
    },
    {
      q: "38. An aircraft 60 miles from a VOR Station has a CDI indication of one-fifth deflection, this represents a course centerline deviation of approximately.",
      options: [
        "1 mile",
        "6 miles",
        "2 miles"
      ],
      answer: "C"
    },
    {
      q: "39. Which maximum range factor decreases as weight decreases?",
      options: [
        "Angle of attack",
        "Altitude",
        "Airspeed"
      ],
      answer: "C"
    },
    {
      q: "40. An airplane departs an airport under the following conditions:\nAirport elevation................................1,500 ft.\nTo cruise at.......................................9,500 ft.\nRate of climb......................................500 ft./min\nAverage true airspeed.........................140 kts.\nTrue course........................................135°\nAverage wind velocity.........................070° at 20 kts.\nVariation............................................5° E\nDeviation............................................-3°\nAverage fuel consumption....................12 gal./hr.\n\nDetermine the approximate time, compass heading, distance, and fuel consumed during the climb.",
      options: [
        "16 min., 128°, 32 NM, 3.8 gal.",
        "14 min., 128°, 32 NM, 3.8 gal",
        "16 min., 120°, 35 NM, 3.2 gal.",
        "14 min., 128°, 35 NM, 3.2 gal."
      ],
      answer: "C"
    },
    {
      q: "41. The relative bearing on an ADF changes from 265° to 260° in 2 minutes of elapsed time. If the ground speed is 145 knots, the distance to that station would be...",
      options: [
        "58 NM",
        "26 NM",
        "37 NM"
      ],
      answer: "A"
    },
    {
      q: "42. When checking the course sensitivity of a VOR receiver, how many degrees should the OBS be rotated to move the CDI from the center to the last dot on either side?",
      options: [
        "18 to 20",
        "5 to 10",
        "10 to 12"
      ],
      answer: "B"
    },
    {
      q: "43. Which is true regarding STARs?",
      options: [
        "STARs are used to separate IFR and VFR traffic.",
        "STARs are established to simply clearance delivery procedures",
        "STARs are used at the certain airport to decrease traffic congestion."
      ],
      answer: "C"
    },
    {
      q: "44. If an airplane is consuming 24.5 gallons of fuel per hour at a cruising altitude of 7,500 feet the ground speed is 299 knots, how much fuel is required to travel 740NM?",
      options: [
        "314 lts.",
        "299 lts.",
        "342 lts."
      ],
      answer: "B"
    },
    {
      q: "45. With a TAS of 115 knots, the relative bearing on an changes from 090° to 095° in 1.5 minutes of elapsed time. The distance to the station would be...",
      options: [
        "34.5 NM",
        "12.5 NM",
        "24.5 NM"
      ],
      answer: "A"
    },
    {
      q: "46. What does the absence of the procedure turn barb on the plan view on an approach chart indicate?",
      options: [
        "Teardrop-type procedure turn is authorized.",
        "Racetrack-type procedure turn is authorized.",
        "A procedure turn is not authorized"
      ],
      answer: "C"
    },
    {
      q: "47. Filed flight plan shall be kept for a period of ____________ and must be made available for reference by the appropriate authority.",
      options: [
        "4 months",
        "6 months",
        "2 months"
      ],
      answer: "C"
    },
    {
      q: "48. The direction in which the airplane is headed as it files is called heading. Its actual path over the ground, combination of the motion of the airplane and motion of the air is called...",
      options: [
        "Track",
        "True course",
        "Drift angle"
      ],
      answer: "A"
    },
    {
      q: "49. To track inbound on the 180 radial of a VOR station, the recommended procedure is to set the OBS to.",
      options: [
        "180 and make heading corrections away from the CDI needle.",
        "180 and make heading corrections toward the CDI needle.",
        "360 and make heading corrections toward the CDI needle."
      ],
      answer: "C"
    },
    {
      q: "50. When the CDI needle is centered during an airborne VOR check, the omnibearing selector and the TO/FROM indicator should read:",
      options: [
        "0° TO, only if you are due south of the VOR.",
        "Within 4° of the selected radial.",
        "Within 6° of the selected radial."
      ],
      answer: "C"
    }
];

const CPL_HUMAN_PERFORMANCE_SET_B_QUESTIONS: ExamQuestion[] = [
    {
      q: "1. The aeronautical Decision Making (ADM) process identifies the steps involved in good decision making. One of these steps includes a pilot:",
      options: [
        "making a rational evaluation of the required actions",
        "developing the “right stuff” attitude",
        "identifying personal attitudes hazardous to safe flight"
      ],
      answer: "C"
    },
    {
      q: "2. Aeronautical Decision Making (ADM) is a:",
      options: [
        "systematic approach to the mental process used by pilots to consistently determine the best course of action for a given set of circumstances",
        "decision making process which relies on good judgement to reduce risks associated with each flight",
        "mental process of analyzing all information in a particular situation and making a timely decision on what action to take"
      ],
      answer: "A"
    },
    {
      q: "3. As hyperventilation progresses a pilot can experience:",
      options: [
        "decreased breathing rate and depth",
        "heightened awareness and feeling of well-being",
        "symptoms of suffocation and drowsiness"
      ],
      answer: "C"
    },
    {
      q: "4. Most pilots have fallen prey to dangerous tendencies or behavior problems at some time. Some of these dangerous tendencies or behavior patterns which must be identified and eliminated include:",
      options: [
        "deficiencies in instrument skills and knowledge of aircraft system or limitations",
        "performance deficiencies from human factors such as fatigue, illness, or emotional problems",
        "peer pressure, get-there-itis, loss of positional or situational awareness, and operating without adequate fuel reserves"
      ],
      answer: "C"
    },
    {
      q: "5. Hypoxia is the result of which of these conditions?",
      options: [
        "Excessive oxygen in the bloodstream",
        "Insufficient oxygen reaching the brain",
        "Excessive carbon dioxide in the bloodstream"
      ],
      answer: "B"
    },
    {
      q: "6. Which is true regarding the presence of alcohol within the human body?",
      options: [
        "A small amount of alcohol increases vision acuity",
        "An increase in altitude decrease the adverse effect of alcohol",
        "Judgement and decision-making abilities can be adversely affected by even very small amounts of alcohol"
      ],
      answer: "C"
    },
    {
      q: "7. To help manage cockpits stress, pilots must:",
      options: [
        "be aware of life stress situations that are similar to those in flying",
        "condition themselves to relax and think rationally when stress appears",
        "avoid situations that will degrade their abilities to handle cockpit responsibilities"
      ],
      answer: "B"
    },
    {
      q: "8. What is the first step in neutralizing a hazardous attitude in the ADM process?",
      options: [
        "Recognition of invulnerability in the situation",
        "Dealing with improper judgement",
        "Recognition of hazardous thoughts"
      ],
      answer: "C"
    },
    {
      q: "9. What should a pilot do when recognizing a thought as hazardous?",
      options: [
        "Avoid developing this hazardous thought",
        "Develop this hazardous thought and follow through with modified action",
        "Label that thought as hazardous, then correct that thought by stating the corresponding learned antidote"
      ],
      answer: "C"
    },
    {
      q: "10. The basic drive for a pilot to demonstrate the “right stuff” can have an adverse effect on safety, by:",
      options: [
        "a total discharged for any alternatives course of action",
        "generating tendencies that lead to practices that are dangerous, often illegal, and may lead to a mishap",
        "allowing events, or the situation, to control his or her actions"
      ],
      answer: "B"
    },
    {
      q: "11. It takes how long for the alcohol from one drink to completely leave the body:",
      options: [
        "1 hour",
        "2 hours",
        "3 hours"
      ],
      answer: "C"
    },
    {
      q: "12. Hazardous attitude which contribute to poor pilot judgement can be effectively counteracted by:",
      options: [
        "early recognition of hazardous thoughts",
        "taking meaningful steps to be more assertive with attitudes",
        "redirecting that hazardous attitudes so that appropriate action can be taken"
      ],
      answer: "C"
    },
    {
      q: "13. Risk management, as part of the Aeronautical Decision Making (ADM) process, relies on which features to reduce the risk associated with each flight?",
      options: [
        "The mental process of analyzing all information in a particular situation and making a timely decision on what action to take",
        "Application of stress management and risk element procedures",
        "Situational awareness, problem recognition, and good judgement"
      ],
      answer: "C"
    },
    {
      q: "14. The passengers for a charter flight have arrived almost an hour late for a flight requires a reservation. Which of the following alternatives best illustrate the ANTIAUTHORITY reaction?",
      options: [
        "Those reservation rules do not apply to this flight",
        "If the pilot hurries, he or she may still make it on time",
        "The pilot can’t help it that the passengers are late"
      ],
      answer: "A"
    },
    {
      q: "15. What does good cockpit stress management begin with?",
      options: [
        "Knowing what causes stress",
        "Eliminating life and cockpit stress issues",
        "Good life stress management"
      ],
      answer: "C"
    },
    {
      q: "16. While conducting an operational check of the cabin pressurization system, the pilot discovers that the rate control feature is inoperative. He knows that he can manually control the cabin pressure, so he elects to disregard the discrepancy. Which of the following alternatives best illustrate the INVULNERABILITY reaction?",
      options: [
        "What is the worst that could happen?",
        "He can handle a little problem like this",
        "It’s too late to fix now"
      ],
      answer: "A"
    },
    {
      q: "17. When a pilot recognizes a hazardous thought, he or she then correct it by stating the corresponding antidote. Which of the following is the antidote for MACHO?",
      options: [
        "Follow the rules, they are usually right",
        "Not so fast. Think first",
        "Taking chances is foolish"
      ],
      answer: "C"
    },
    {
      q: "18. What are some of the hazardous attitude dealt with in Aeronautical Decision making (ADM)?",
      options: [
        "Antiauthority (don’t tell me), impulsivity (do something quickly without thinking), macho (i can do it)",
        "Risk management, stress management, and risk elements",
        "Poor decision making, situational awareness, and judgement"
      ],
      answer: "A"
    },
    {
      q: "19. Hypoxia susceptibility due to inhalation of carbon monoxide increases as:",
      options: [
        "humidity decreases",
        "altitude increases",
        "oxygen demand increases"
      ],
      answer: "B"
    },
    {
      q: "20. The pilot and passengers are anxious to get to their destination for a business presentation. Level IV thunderstorms are reported to be in a line across their intended route of flight. Which of the following alternatives best illustrate the IMPULSIVITY reaction?",
      options: [
        "They want to hurry and get going, before things get worse",
        "A thunderstorm won’t stop them",
        "They can’t change the weather, so they might as well go"
      ],
      answer: "A"
    },
    {
      q: "21. An early part of the Aeronautical Decision Making (ADM) process involves:",
      options: [
        "taking a self-assesssment hazardous attitude inventory test",
        "understanding the drive to have the “right stuff”",
        "obtaining proper flight instruction and experience during training"
      ],
      answer: "A"
    },
    {
      q: "22. To best overcome the effects of spatial disorientation, a pilot should:",
      options: [
        "rely on body sensations",
        "increase the breathing rate",
        "rely on aircraft instrument indications"
      ],
      answer: "C"
    },
    {
      q: "23. Which would most likely result in hyperventilation?",
      options: [
        "Insufficient oxygen",
        "Excessive carbon monoxide",
        "Insufficient carbon dioxide"
      ],
      answer: "C"
    },
    {
      q: "24. To scan properly for traffic, a pilot should:",
      options: [
        "slowly sweep the field of vision from one side to the other at intervals",
        "concentrate on any peripheral movement detected",
        "use a series of short, regularly spaced eye movements that bring successive areas of the sky into the central visual field"
      ],
      answer: "C"
    },
    {
      q: "25. While on an IFR flight, a pilot merges from a cloud to find himself within 300 feet of a helicopter, which of the following alternatives best illustrates the “MACHO” reaction?",
      options: [
        "He is not too concerned, everything will be alright",
        "He flies a little closer, just to show him",
        "He quickly turns away and dives, to avoid collision"
      ],
      answer: "B"
    },
    {
      q: "26. Which is a common symptom of hyperventilation?",
      options: [
        "Drowsiness",
        "Decreased breathing rate",
        "Euphoria – sense of well-being"
      ],
      answer: "A"
    },
    {
      q: "27. When a pilot recognized a hazardous thought, he or she then should correct it by stating the corresponding antidote, which of the following is the antidote for ANTIAUTHORITY?",
      options: [
        "Not so fast, Think first",
        "It won’t happen to me. It could happen to me",
        "Don’t tell me. Follow the rules. They are usually right"
      ],
      answer: "C"
    },
    {
      q: "28. Examples of classic behavioural traps that experienced pilots may fall into are trying to:",
      options: [
        "assume additional responsibilities and assert PIC authority",
        "promote situational awareness and then necessary changes in behaviour",
        "complete a flight as planned, please passengers, meet schedules, and demonstrate the “right stuff”"
      ],
      answer: "C"
    },
    {
      q: "29. To overcome the symptoms of hyperventilation, a pilot should:",
      options: [
        "Swallow or yawn",
        "Slow the breathing rate",
        "Increase the breathing rate"
      ],
      answer: "B"
    },
    {
      q: "30. A pilot and friends are going to fly to an out-of-town football game. When the passengers arrive, the pilot determines that they will be over the maximum gross weight for takeoff with the existing fuel load, which of the following alternatives best illustrate the RESIGNATION reaction:",
      options: [
        "Well, nobody told him about the extra weight",
        "Weight and balance is a formality forced on pilots by the FAA",
        "He can’t wait around to de-fuel, they have to get there on time"
      ],
      answer: "A"
    }
];

const CPL_AIR_LAW_2_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. The Civil Aviation Authority of the Philippines (CAAP) is the agency responsible for:",
    options: [
        "Implementing policies on civil aviation to assure safe, economic and efficient air travel.",
        "Investigation of military aircraft accidents.",
        "Operating all airports in the Philippines."
    ],
    answer: "A"
  },
  {
    q: "2. Under PCAR Part 2, what is the validity period of a Class 1 Medical Certificate for a CPL holder under 40 years old?",
    options: [
        "6 months.",
        "12 months.",
        "24 months."
    ],
    answer: "B"
  },
  {
    q: "3. No person may act as pilot in command of a civil aircraft under IFR or in weather conditions less than the minimums prescribed for VFR unless:",
    options: [
        "They hold an instrument rating or an airline transport pilot license.",
        "They hold at least a Private Pilot License.",
        "They have filed a flight plan."
    ],
    answer: "A"
  }
];

const CPL_RADIOTELEPHONY_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. What is the correct distress call?",
    options: [
        "PAN PAN, PAN PAN, PAN PAN",
        "MAYDAY, MAYDAY, MAYDAY",
        "EMERGENCY, EMERGENCY, EMERGENCY"
    ],
    answer: "B"
  },
  {
    q: "2. Which frequency is the international air distress frequency?",
    options: [
        "123.45 MHz",
        "121.50 MHz",
        "122.90 MHz"
    ],
    answer: "B"
  },
  {
    q: "3. The instruction 'READ BACK' means:",
    options: [
        "Repeat all, or the specified part, of this message back to me exactly as received.",
        "Read the message back to yourself.",
        "Check your flight plan."
    ],
    answer: "A"
  }
];

const CPL_AGK_QUESTIONS: ExamQuestion[] = [
  {
    q: "1. What is the primary function of the aircraft's electrical system battery?",
    options: [
        "To provide power for starting and as a backup source.",
        "To power the magnetos.",
        "To regulate the alternator voltage."
    ],
    answer: "A"
  },
  {
    q: "2. In a retractable landing gear system, what prevents the gear from retracting on the ground?",
    options: [
        "The gear handle lock.",
        "The squat switch (safety switch).",
        "Hydraulic pressure relief valve."
    ],
    answer: "B"
  },
  {
    q: "3. What causes a wing to stall?",
    options: [
        "Low airspeed.",
        "Exceeding the critical angle of attack.",
        "Heavy weight."
    ],
    answer: "B"
  }
];

const CPL_FLIGHT_PLANNING_QUESTIONS: ExamQuestion[] = [
  {
    q: "15. (Refer to Figure 11) What would be the approximate true airspeed and fuel consumption per hour at an altitude of 7,500 feet, using 52 percent power?",
    options: ["103 MPH TAS, 6.3 GPH", "105 MPH TAS, 6.6 GPH", "105 MPH TAS, 6.2 GPH"],
    answer: "C"
  },
  {
    q: "20. (Refer to Figure 8) With 38 gallons of fuel aboard at cruise power (55 percent), how much flight time is available with night VFR fuel reserve still remaining?",
    options: ["2 hours 34 minutes", "2 hours 49 minutes", "3 hours 18 minutes"],
    answer: "A"
  },
  {
    q: "25. When computing weight and balance, the basic empty weight includes the weight of the airframe, engine(s), and all installed optional equipment. Basic empty weight also includes:",
    options: [
      "The unusable fuel, fuel operating fluids, and full oil",
      "All usable fuel, full oil, hydraulic fluid, but does not include the weight of the pilot, passengers, or baggage",
      "All usable fuel and oil, but does not include any radio equipment or instruments that were installed by someone other than the manufacturer."
    ],
    answer: "A"
  },
  {
    q: "23. (Refer to Figure 35)\nGiven:\nTemperature...70°F\nPressure altitude...Sea level\nWeight...3,400 lb\nHeadwind...16 kts\nDetermine the approximate ground roll.",
    options: ["689 feet", "716 feet", "1,275 feet"],
    answer: "A"
  },
  {
    q: "3. If all index units are positive when computing weight and balance, the location of the datum would be at the:",
    options: ["Centreline of the main wheels", "Nose, or out in front of the airplane", "Centreline of the nose or tailwheel, depending on the type of airplane"],
    answer: "B"
  },
  {
    q: "12. (Refer to Figure 13)\nGiven:\nAircraft weight...3,400 lbs\nAirport pressure altitude...6,000 ft\nTemperature at 6,000 ft...10°C\nUsing a maximum rate of climb under the given conditions, how much fuel would be from engine start to a pressure altitude of 16,000 feet?",
    options: ["43 pounds", "45 pounds", "49 pounds"],
    answer: "A"
  },
  {
    q: "24. (Refer to Figure 35)\nGiven:\nTemperature...85°F\nPressure altitude...6,000 ft\nWeight...2,800 lb\nHeadwind...14 kts\nDetermine the approximate ground roll.",
    options: ["742 feet", "1,280 feet", "1,480 feet"],
    answer: "A"
  },
  {
    q: "18. (Refer to figure 8) Approximately how much fuel would be consumed when climbing at 75 percent power for 7 minutes?",
    options: ["1.82 gallons", "1.97 gallons", "2.12 gallons"],
    answer: "C"
  },
  {
    q: "16. (Refer to Figure 8)\nGiven:\nFuel quantity...65 gal\nPower-cruise (lean)...55 percent\nApproximately how much flight time would be available with a night VFR fuel reserve remaining?",
    options: ["3 hours 8 minutes", "3 hours 22 minutes", "3 hours 43 minutes"],
    answer: "B"
  },
  {
    q: "19. (Refer to Figure 8) Determine the amount of fuel consumed during takeoff and climb at 70 percent power for 10 minutes.",
    options: ["2.66 gallons", "2.88 gallons", "3.2 gallons"],
    answer: "B"
  },
  {
    q: "17. (Refer to Figure 8)\nGiven:\nFuel quantity...65 gal\nBest power (level flight)...55 percent\nApproximately how much flight time would be available with a day VFR fuel reserve remaining?",
    options: ["4 hours 17 minutes", "4 hours 30 minutes", "5 hours 4 minutes"],
    answer: "B"
  },
  {
    q: "22. (Refer to Figure 35)\nGiven:\nTemperature...80°F\nPressure altitude...4,000 ft\nWeight...2,800 lb\nHeadwind...24 kts\nWhat is the total landing distance over a 50-foot obstacle?",
    options: ["1,125 feet", "1,250 feet", "1,325 feet"],
    answer: "B"
  },
  {
    q: "14. (Refer to Figure 11) What would be the endurance at an altitude of 7,500 feet, using 52 percent power?\nNote: (With 48 gallons of fuel – no reserve)",
    options: ["6.1 hours", "7.7 hours", "8.0 hours"],
    answer: "B"
  },
  {
    q: "13. (Refer to Figure 11) If the cruise altitude is 7,500 feet, using 64 percent power at 2,500 RPM, what would be the range with 48 gallons of usable fuel?",
    options: ["635 miles", "645 miles", "810 miles"],
    answer: "C"
  },
  {
    q: "21. (Refer to Figure 35)\nGiven:\nTemperature...50°F\nPressure altitude...Sea level\nWeight...3,000 lb\nHeadwind...10 kts\nDetermine the approximate ground roll.",
    options: ["425 feet", "636 feet", "836 feet"],
    answer: "B"
  },
  {
    q: "11. (Refer to Figure 13)\nGiven:\nAircraft weight...4,000 lbs\nAirport pressure altitude...2,000 ft\nTemperature at 2,000 ft...32°C\nUsing a maximum rate of climb under the given conditions, how much time would be required to climb to a pressure altitude of 8,000 feet?",
    options: ["7 minutes", "8.4 minutes", "11.2 minutes"],
    answer: "B"
  }
];

export const EXAM_DATA = {
  'NAVIGATION (CPL)': {
    title: 'NAVIGATION',
    subtitle: 'COMMERCIAL PILOT LICENSE',
    questions: CPL_NAVIGATION_QUESTIONS
  },
  'HUMAN PERFORMANCE (CPL)': {
    title: 'HUMAN PERFORMANCE',
    subtitle: 'COMMERCIAL PILOT LICENSE',
    questions: CPL_HUMAN_PERFORMANCE_SET_B_QUESTIONS
  },
  'HUMAN PERFORMANCE (PPL)': {
    title: 'HUMAN PERFORMANCE',
    subtitle: 'PRIVATE PILOT LICENSE',
    questions: PPL_HUMAN_PERFORMANCE_QUESTIONS
  },
  'AIR LAW (PPL)': {
    title: 'AIR LAW',
    subtitle: 'PRIVATE PILOT LICENSE',
    questions: PPL_AIR_LAW_QUESTIONS
  },
  'AIR LAW PHILIPPINES PCAR': {
    title: 'AIR LAW PHILIPPINES PCAR',
    subtitle: 'REVIEWER & EXAM',
    questions: CPL_AIR_LAW_2_QUESTIONS
  },
  'RADIOTELEPHONY (CPL)': {
    title: 'RADIOTELEPHONY',
    subtitle: 'COMMERCIAL PILOT LICENSE',
    questions: CPL_RADIOTELEPHONY_QUESTIONS
  },
  'AIRCRAFT GENERAL KNOWLEDGE (CPL)': {
    title: 'AIRCRAFT GENERAL KNOWLEDGE',
    subtitle: 'COMMERCIAL PILOT LICENSE',
    questions: CPL_AGK_QUESTIONS
  },
  'FLIGHT PLANNING (CPL)': {
    title: 'FLIGHT PERFORMANCE & PLANNING',
    subtitle: 'COMMERCIAL PILOT LICENSE',
    questions: CPL_FLIGHT_PLANNING_QUESTIONS
  },
  'FLIGHT PLANNING (PPL)': {
    title: 'FLIGHT PERFORMANCE & PLANNING',
    subtitle: 'PRIVATE PILOT LICENSE',
    questions: PPL_FLIGHT_PERFORMANCE_PLANNING_QUESTIONS
  }
};
