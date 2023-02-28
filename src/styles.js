export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#b0c0d0",
    minHeight: "100%",
    marginTop: 0,
    paddingTop: 10,
  },

  addExerciseContainer: {
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#b0c0d0",
    paddingVertical: 12,
    borderBottomColor: "#204060",
    borderBottomWidth: 2,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    display: "inline",
    width: "64%",
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#109910",
    display: "inline",
    width: "25%",
    height: 44,
    margin: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  bg: {
    flex: 1,
    justifyContent: "center",
  },

  exerciseCardContainer: {
    backgroundColor: "#4080B0",
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderColor: "#204060",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textColor: {
    fontSize: 20,
    color: "#FFFFFF",
    textTransform: "capitalize",
  },

  textColorDone: {
    fontSize: 20,
    color: "#404040",
    textTransform: "capitalize",
    textDecorationLine: "line-through",
  },
});
