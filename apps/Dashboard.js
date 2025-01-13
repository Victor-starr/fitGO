import * as React from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { ProgressCircle } from "react-native-svg-charts";
import { LineChart } from "react-native-chart-kit";

function Dashboard() {
  // CALENDAR DATA
  let calendarDate = new Date('2024-01-11');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  calendarDate = `${calendarDate.getDate()}-${monthNames[calendarDate.getMonth()]}-${calendarDate.getFullYear()}`;

  // USER DATA
  const userInfo = {
    totalCalories: 2500,
    carbsGoal: 300,
    proteinGoal: 150,
    fatGoal: 70,
    carbsEaten: 50,
    proteinEaten: 95,
    fatEaten: 70,
    caloriesEaten: 1500,
    caloriesBurned: 500,
    loggingHistory: [
      { date: 'Jan', carbs: 50, protein: 30, fat: 20 },
      { date: 'Feb', carbs: 60, protein: 40, fat: 30 },
      { date: 'Mar', carbs: 70, protein: 50, fat: 40 },
      { date: 'Apr', carbs: 80, protein: 60, fat: 50 },
      { date: 'May', carbs: 90, protein: 70, fat: 60 },
      { date: 'Jun', carbs: 100, protein: 80, fat: 70 },
      { date: 'Now', carbs: 110, protein: 90, fat: 80 },
    ]
  };

  const { totalCalories, carbsGoal, proteinGoal, fatGoal, carbsEaten, proteinEaten, fatEaten, caloriesEaten, caloriesBurned, loggingHistory } = userInfo;

  const carbsProgress = carbsEaten / carbsGoal;
  const proteinProgress = proteinEaten / proteinGoal;
  const fatProgress = fatEaten / fatGoal;

  // Generate chart data based on logging history
  const labels = loggingHistory.map(entry => entry.date);
  const carbsData = loggingHistory.map(entry => entry.carbs);
  const proteinData = loggingHistory.map(entry => entry.protein);
  const fatData = loggingHistory.map(entry => entry.fat);

  const dailyCarbsData = {
    labels,
    datasets: [
      {
        data: carbsData,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Carbs"]
  };

  const dailyProteinData = {
    labels,
    datasets: [
      {
        data: proteinData,
        color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Protein"]
  };

  const dailyFatData = {
    labels,
    datasets: [
      {
        data: fatData,
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Fat"]
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.scrollView, { paddingBottom: 50 }]} bounces={false}>
        <Text style={styles.headerText}>Dashboard</Text>
        {/* Section #1*/}
        <Text style={styles.SectionText}>{calendarDate}</Text>
        <View style={styles.container}>
          {/* Remaining Calories Section */}
          <View style={styles.circleContainer}>
            <ProgressCircle
              style={styles.progressCircle}
              progress={caloriesEaten / totalCalories}
              progressColor={"#38BDF8"}
              startAngle={-Math.PI * 0.8}
              endAngle={Math.PI * 0.8}
              backgroundColor="#3B4252"
            />
            <View style={styles.circleContent}>
              <Text style={styles.caloriesText}>{totalCalories}</Text>
              <Text style={styles.labelText}>Remaining</Text>
            </View>
          </View>

          {/* Eaten and Burned Section */}
          <View style={styles.row}>
            <View style={styles.infoBox}>
              <Text style={styles.number}>{caloriesEaten}</Text>
              <Text style={styles.labelText}>Eaten</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.number}>{caloriesBurned}</Text>
              <Text style={styles.labelText}>Burned</Text>
            </View>
          </View>

          {/* Macronutrients Section */}
          <View style={styles.row}>
            <View style={styles.macroBox}>
              <Text style={styles.labelText}>Carbs</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { flex: carbsProgress, backgroundColor: "#38BDF8" }]} />
              </View>
              <Text style={styles.macroValue}>{carbsEaten} g / {carbsGoal} g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.labelText}>Protein</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { flex: proteinProgress, backgroundColor: "#38BDF8" }]} />
              </View>
              <Text style={styles.macroValue}>{proteinEaten} g / {proteinGoal} g</Text>
            </View>
            <View style={styles.macroBox}>
              <Text style={styles.labelText}>Fat</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { flex: fatProgress, backgroundColor: "#38BDF8" }]} />
              </View>
              <Text style={styles.macroValue}>{fatEaten} g / {fatGoal} g</Text>
            </View>
          </View>
        </View>
        {/* Section #2 */}
        <Text style={styles.SectionText}>Insights and Analytics</Text>
        <View style={styles.gridContainer}>
          <View style={styles.chartContainer}>
            <LineChart
              data={dailyCarbsData}
              width={Dimensions.get("window").width * 0.9}
              height={180}
              yAxisLabel=""
              yAxisSuffix="g"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={dailyProteinData}
              width={Dimensions.get("window").width * 0.9}
              height={180}
              yAxisLabel=""
              yAxisSuffix="g"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={dailyFatData}
              width={Dimensions.get("window").width * 0.9}
              height={180}
              yAxisLabel=""
              yAxisSuffix="g"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundColor: "#1E293B",
  backgroundGradientFrom: "#1E293B",
  backgroundGradientTo: "#1E293B",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#0F172A",
    paddingTop: 30,
  },
  scrollView: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
    textAlign: "start",
    width: "90%",
  },
  SectionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#94A3B8",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 15,
    textAlign: "start",
    width: "90%",
  },
  container: {
    backgroundColor: "#1E293B",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    width: "100%",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  progressCircle: {
    height: 140,
    width: 140,
  },
  circleContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  labelText: {
    color: "#A0AEC0",
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoBox: {
    alignItems: "center",
    flex: 1,
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  macroBox: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#3B4252",
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    marginTop: 5,
    width: "100%",
  },
  progressFill: {
    backgroundColor: "#38BDF8",
    flex: 0,
  },
  macroValue: {
    color: "#A0AEC0",
    fontSize: 10,
    marginTop: 6,
  },
  gridContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default Dashboard;
