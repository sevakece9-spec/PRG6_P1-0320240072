import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View, Text, SafeAreaView, StyleSheet,
  TouchableOpacity, ScrollView, Alert, TextInput
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
const HomeScreen = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState('Memuat jam...');
  const [note, setNote] = useState('');
  const noteInputRef = useRef(null);

  const attendanceStats = useMemo(() => {
    return { totalPresent: 12, totalAbsent: 2 };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('id-ID'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    if (isCheckedIn) return Alert.alert('Perhatian', 'Anda sudah Check In.');
    if (note.trim() === '') {
      Alert.alert('Peringatan', 'Catatan kehadiran wajib diisi!');
      noteInputRef.current.focus();
      return;
    }
    setIsCheckedIn(true);
    Alert.alert('Sukses', `Berhasil Check In pada pukul ${currentTime}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Attendance Apps</Text>
          <Text style={styles.clockText}>{currentTime}</Text>
        </View>

        {/* Student Card */}
        <View style={styles.cardContainer}>
          <View style={styles.profileRow}>
            <View style={styles.avatarPlaceholder}>
              <MaterialIcons name="person" size={40} color="#555" />
            </View>
            <View>
              <Text style={styles.nameText}>Roshela Amelia Sari</Text>
              <Text>NIM : 0320240072</Text>
              <Text>Class : Informatika-2A</Text>
            </View>
          </View>
        </View>

        {/* Today's Class */}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Today's Class</Text>
          <Text style={styles.className}>Mobile Programming</Text>
          <Text style={styles.subText}>08:00 - 10:00</Text>
          <Text style={styles.subText}>Lab 3A</Text>
        </View>

        {/* Input Catatan */}
        {!isCheckedIn && (
          <TextInput
            ref={noteInputRef}
            style={styles.inputCatatan}
            placeholder="Tulis catatan (cth: Hadir lab)"
            value={note}
            onChangeText={setNote}
          />
        )}

        {/* Tombol Check In */}
        <TouchableOpacity
          style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
          onPress={handleCheckIn}
          disabled={isCheckedIn}
        >
          <Text style={styles.buttonText}>
            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
          </Text>
        </TouchableOpacity>

        {/* Statistik Kehadiran */}
        <View style={styles.cardContainer}>
          <View style={styles.statsCard}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
              <Text style={styles.statLabel}>Total Present</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
              <Text style={styles.statLabel}>Total Absent</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F9',
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  clockText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  inputCatatan: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: "#4A90E2",
  },
  buttonDisabled: {
    backgroundColor: "#ADCFFF",
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
});

export default HomeScreen;
