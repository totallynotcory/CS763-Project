export function validateGoalForm(formData) {
    const { sleepHours, weightLbs, stepsCounts, waterIntakeGlasses, exerciseMinutes } = formData;


    if(
        sleepHours === "" ||
        weightLbs === "" ||
        stepsCounts === "" ||
        waterIntakeGlasses === "" ||
        exerciseMinutes === ""
      )
      {
        return { isValid: false, message: 'Form field(s) missing' };
    }  
    if  (
        (sleepHours < 0 || sleepHours > 24)||
        weightLbs <= 0 ||
        stepsCounts < 0 ||
        waterIntakeGlasses < 0 ||
        exerciseMinutes < 0
      )
      {
        return { isValid: false, message: 'Form field(s) must be greater than or equal to zero' };
      }

    return { isValid: true, message: 'Form is valid' };

  
}