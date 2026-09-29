import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const TOPICS = {
  Interview: [
    "Tell me about a time you failed badly.",
    "Why should I NOT hire you?",
    "What is your biggest weakness in teamwork?",
    "Explain your 2-year gap.",
    "Where do you see yourself if we don't promote you?"
  ],
  Confrontation: [
    "Your friend borrowed money and refused to pay. Confront them.",
    "Your boss took credit for your work. What do you say?",
    "Tell your partner you need space without hurting them.",
    "Say NO to a family member asking for money."
  ],
  Negotiation: [
    "Negotiate salary 40% higher than offered.",
    "Convince landlord to reduce rent by 20%.",
    "Ask client to pay double for urgent delivery."
  ],
  Apology: [
    "Apologize for missing your best friend's wedding.",
    "You shouted at your teammate. Apologize sincerely.",
    "You broke a promise. How do you make it right?"
  ]
};

export default function App() {
  const [category, setCategory] = useState('Interview');
  const [question, setQuestion] = useState(TOPICS.Interview[0]);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const newQuestion = () => {
    const list = TOPICS[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setQuestion(random);
    setSeconds(60);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); setSeconds(60); };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>ToughTalk</Text>
      <Text style={styles.subtitle}>Practice makes confident</Text>

      <View style={styles.timerBox}>
        <Text style={[styles.timer, seconds < 10 && {color: '#FF3B30'}]}>
          {String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}
        </Text>
        <View style={styles.timerRow}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={toggleTimer}>
            <Text style={styles.btnText}>{isActive? 'Pause' : 'Start Speaking'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSec]} onPress={resetTimer}>
            <Text style={[styles.btnText, {color:'#000'}]}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:20, maxHeight:40}}>
        {Object.keys(TOPICS).map(cat => (
          <TouchableOpacity key={cat} onPress={()=>{setCategory(cat); setQuestion(TOPICS[cat][0]); setIsActive(false); setSeconds(60);}}
            style={[styles.catChip, category===cat && styles.catActive]}>
            <Text style={[styles.catText, category===cat && {color:'#fff'}]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>{category.toUpperCase()} • TOUGH QUESTION</Text>
        <Text style={styles.cardQ}>{question}</Text>
      </View>

      <TouchableOpacity style={styles.nextBtn} onPress={newQuestion}>
        <Text style={styles.nextText}>Next Tough Question →</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Shipathon MVP: Speak 60s non-stop. Build confidence under pressure.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#FFF9E6', paddingTop:70, paddingHorizontal:20 },
  title:{ fontSize:32, fontWeight:'900', textAlign:'center' },
  subtitle:{ textAlign:'center', color:'#888', marginTop:4, fontSize:14, letterSpacing:1 },
  timerBox:{ backgroundColor:'#fff', borderRadius:24, padding:20, marginTop:24, alignItems:'center', elevation:4, shadowColor:'#000', shadowOpacity:0.08, shadowRadius:12 },
  timer:{ fontSize:64, fontWeight:'800' },
  timerRow:{ flexDirection:'row', gap:12, marginTop:12 },
  btn:{ paddingHorizontal:28, paddingVertical:12, borderRadius:12 },
  btnPrimary:{ backgroundColor:'#000' },
  btnSec:{ backgroundColor:'#FFE566', borderWidth:1, borderColor:'#000' },
  btnText:{ color:'#fff', fontWeight:'700' },
  catChip:{ paddingHorizontal:16, paddingVertical:8, backgroundColor:'#fff', borderRadius:20, marginRight:8, borderWidth:1, borderColor:'#ddd' },
  catActive:{ backgroundColor:'#000', borderColor:'#000' },
  catText:{ fontWeight:'600' },
  card:{ backgroundColor:'#000', borderRadius:20, padding:20, marginTop:18, minHeight:140 },
  cardLabel:{ color:'#FFE566', fontSize:11, fontWeight:'800', letterSpacing:1 },
  cardQ:{ color:'#fff', fontSize:20, fontWeight:'600', marginTop:10, lineHeight:28 },
  nextBtn:{ backgroundColor:'#FFE566', padding:18, borderRadius:16, marginTop:16, borderWidth:1.5, borderColor:'#000' },
  nextText:{ textAlign:'center', fontWeight:'800', fontSize:16 },
  hint:{ textAlign:'center', color:'#999', marginTop:18, fontSize:12 }
});
