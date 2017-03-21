class RunConverter
{
    /**
     * @param speed_km_h : Add value in kilometers / hour. For Example: 14.5
     * @return String, result example '14.5 km/h = 04:08 min/km'
     */
    
    KilometersPerHourToPaceMinKm(speed_km_h: number) {
        //Get pace minutes and seconds
        let min_sc_km:number = 60 / speed_km_h;

        //Convert String
        let result_str:string = String(min_sc_km);

        //Get decimal value
        let index: number = result_str.indexOf(".");

        //Get only pace minutes
        let min_pace: number = this.removeDecimalValue(min_sc_km);
        //Get only pace seconds
        let sec_pace:number = removeDecimalValue(+result_str.substring(index)) * 60);

        return getPaceMinKMInCorrectFormat(min_pace, sec_pace);
    }

    /**
     *
     * @param min_pace int value (minutes)
     * @param sec_pace int value (seconds)
     * @return String, result example '04:17 min/km = 14.007782 km/h'
     */
    PaceMinKmToKilometersPerHour(min_pace: number, sec_pace:number) {
        /*if (sec_pace >= 60) return String.
                format("Seconds only 0-59 range (Not correct data input: %d minutes - %d seconds", min_pace, sec_pace);*/

        //Obtain total time with decimals (min and seconds)
        let total_time: number = ((double) sec_pace / 60) + min_pace;

        double km_h = 60 / total_time;

        return String.valueOf((Math.round(km_h * 100))/100);
    }

    /**
     * @param speed_m_min meters for min
     * @return String, result example '241.9 m/min = 14.514 km/h'
     */
    MetersMinuteToKilometersPerHour(double speed_m_min) {
        if (speed_m_min <= 0) return "Stop situation";

        return getDoubleValue(String.valueOf((speed_m_min*60) / 1000), 2);
    }

    /**
     * @param speed_km_h Add value in kilometers / hour. For Example: 14.5
     * @return String, result example '241.9 m/min = 14.514 km/h'
     */
    @Override
    public String KilometersPerHourToMetersMinute(double speed_km_h) {
        if (speed_km_h <= 0) return "Stop situation";
        return getDoubleValue(String.valueOf(((speed_km_h/60)*1000)), 2);
    }

    /**
     * @param speed_m_sec meters for second
     * @return String, result example '4.0316 m/sec = 14.514 km/h'
     */
    @Override
    public String MetersSecondToKilometersPerHour(double speed_m_sec) {

        return MetersMinuteToKilometersPerHour(speed_m_sec * 60);
    }

    /**
     * @param speed_km_h Add value in kilometers / hour. For Example: 14.5
     * @return String, result example '4.0316 m/sec = 14.514 km/h'
     */
    @Override
    public String KilometersPerHourToMetersSecond(double speed_km_h) {
        String result_with_m_min = KilometersPerHourToMetersMinute(speed_km_h);

        return getDoubleValue(String.valueOf((Double.parseDouble(result_with_m_min.replace(",", ".").trim())) / 60), 2);
    }

    /**
     * @param time HH:MM:SS formatAdd value in kilometers / hour. For Example: 01:00:00
     * @param km   double value to asign total kms to convert. For Example: 14.0
     * @return String with pace min/km, result example '01:00:00 / 15km = 04:00min/km'
     */
    @Override
    public String TimeAndKilometersToPacePerKm(String time, double km) {

        //Get total time to complete km in seconds
        double time_complete_km_in_seconds = getTimeInSecondsFromTime(time)/km;

        //Apply rint
        time_complete_km_in_seconds=Math.rint(time_complete_km_in_seconds);

        //Get min
        int min_pace = (int) time_complete_km_in_seconds / 60;

        //Get seconds to pace per km
        int sec_pace = (int) time_complete_km_in_seconds % 60;

        //Return with pretty format
        return getPaceMinKMInCorrectFormat(min_pace, sec_pace);
    }

    /**
     * @param time        HH:MM:SS formatAdd value in kilometers / hour. For Example: 01:00:00
     * @param pace_min_km MM:SS String value with pace per km. For Example: 04:00 min/km
     * @return String with pace min/km, result example '01:00:00 / 04:00min/km = 15km'
     */
    @Override
    public String TimeAndPacePerKmToTotalKilometers(String time, String pace_min_km) {

        //Denbora totala segundutan lortzeko
        double sgTotalak=getTimeInSecondsFromTime(time);
        //Km bateko segundu totalak kalkulatzeko
        double sgKm=getTimeInSecondsFromPacePerKm(pace_min_km);
        //Denbora zehatz batean egin ditugun km kopurua emango da
        double kilometers= sgTotalak/sgKm;
        kilometers=Math.rint(kilometers*1000)/1000;

        return getDoubleValue(String.valueOf(kilometers), 2);
    }

    /**
     * @param km          double value to asign total kms to convert. For Example: 14.0
     * @param pace_min_km MM:SS String value with pace per km. For Example: 04:00 min/km
     * @return String with pace min/km, result example '15km / 04:00min/km = 01:00:00'
     */
    @Override
    public String TotalKilometersAndPacePerKmToTime(double km, String pace_min_km) {

        //total seconds to complete one kilometer (from pace per km)
        double sgKm=getTimeInSecondsFromPacePerKm(pace_min_km);

        //Total time to complete x km in x min per km
        let total_time_in_seconds = (int) (sgKm * km);

        //Convert total seconds in time format
        let hours = total_time_in_seconds / 3600;
        int minutes = (total_time_in_seconds % 3600) / 60;
        int seconds = total_time_in_seconds % 60;

        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }

    /**
     * @param time        HH:MM:SS formatAdd value in kilometers / hour. For Example: 01:00:00
     * @param total_steps int value. For Example: 12304.
     * @return String with pace min/km, result example '15km / 04:00min/km = 01:00:00'
     */
    @Override
    public String StepsPerMinuteFromTotalStepsAndTime(String time, int total_steps) {
        /******
         * 14500 steps in 1h18min00sg (4680seconds)
         * x steps in minute (60 seconds)
         *
         * x = (14500 * 60) / 4680 = 185,89 step / min
         */
        return String.valueOf(14500 * 60 /getTimeInSecondsFromTime(time));
    }

    /**
     * @param km          double value to asign total kms to convert. For Example: 14.0
     * @param total_steps int value. For Example: 12304.
     * @return String with pace min/km, result example '15km / 04:00min/km = 01:00:00'
     */
    @Override
    public String StepsPerKmFromTotalStepsAndDistanceKm(double km, int total_steps) {
        return String.valueOf((int)(total_steps / km));
    }

    /**
     * @param distance double value to asign total kms to convert. For Example: If value > 5 considerer input meters
     * @return String with vO2max, result example '3850 (metres)-> VO2 max = 74 To calculate: (meters - 504) / 45
     */
    @Override
    public String VO2MaxInCooperTest(double distance) {

        if (distance < 1000) /*Distance in kmeters*/ distance = getDistanceinMeters(distance);

        return getDoubleValue(String.valueOf((distance - 504) / 45), 3);
    }

    /**
     * @param v02   double value to asign vO2max that use to calculate distance to complete to obtain this vO2 max.
     *              For Example: 74 (VO2max) = 3850 m in 12 minutes.
     * @param in_km To return value in kilometers instead of meters (default)
     * @return String with distance in meters or km (boolean specific)
     */
    @Override
    public String DistanceNeedToObtainSpecificVO2MaxWithCooperTest(double v02, boolean in_km) {
        if (!in_km) return String.valueOf((v02*45) + 504);
        return String.valueOf(getDoubleValue(String.valueOf(getDistanceInKms((v02*45) + 504)), 3));
    }

    /**
     * @param percent : Percent to calculate FC range min value to FC zone (for example 50 = Z1)
     *                Z1: 50-60
     *                Z2: 60-70
     *                Z3: 70-80
     *                Z4: 80-90
     *                Z5: 90-100
     * @param low_fc  min ppm
     * @param max_fc  max ppm
     * @return Obtain select percent zone ppm range
     */
    @Override
    public String ObtainFCZoneWithPercent(int percent, int low_fc, int max_fc) {

        String zone = "Zone " + ((percent - 50) / 10 + 1) + ": ";
        return zone + (((max_fc-low_fc) * (percent)/100) + low_fc) + " - " + (((max_fc-low_fc) * (percent+10) / 100) + low_fc);
    }

    /**
     * @param low_fc min ppm
     * @param max_fc max ppm
     * @return FC zones with PPM range
     */
    @Override
    public ArrayList<String> ObtainResumeOfFCZones(int low_fc, int max_fc) {
        ArrayList<String> fc_data = new ArrayList<>();
        for (int i = 50; i <= 90; i = i+10)
        {
            fc_data.add(ObtainFCZoneWithPercent(i, low_fc, max_fc));
        }
        return fc_data;
    }

    /**
     * @param feets Feets to convert to metres
     * @return Meters
     */
    @Override
    public String ConvertFeetsToMeters(int feets) {
        return String.valueOf(feets/3.28084);
    }

    /**
     * @param meters meters to convert to feets
     * @return Feets
     */
    @Override
    public String ConvertMetersToFeets(int meters) {
        return String.valueOf(meters*3.28084);
    }

    /**
     * @param yards Yards to convert to metres
     * @return Meters
     */
    @Override
    public String ConvertYardsToMeters(int yards) {
        return String.valueOf(yards/1.0936133333333);
    }

    /**
     * @param meters Meters to convert to yards
     * @return Yards
     */
    @Override
    public String ConvertMetersToYards(int meters) {
        return String.valueOf(meters*1.0936133333333);
    }


    removeDecimalValue(value: number)
    {
        int index = String.valueOf(value).indexOf(".");
        return Integer.parseInt(String.valueOf(value).substring(0, index));
    }

    private String getPaceMinKMInCorrectFormat(int min_pace, int sec_pace)
    {
        //Add format to result depending minutes and seconds pace
        if (sec_pace<10 && min_pace < 10) return "0" + min_pace + ":0" + sec_pace;
        else if (sec_pace>=10 && min_pace<10) return "0" + min_pace + ":" +sec_pace;
        else if (sec_pace<10 && min_pace>=10) return min_pace + ":0" +sec_pace;
        else return min_pace + ":" +sec_pace;
    }

    private int getTimeInSecondsFromTime(String time)
    {

        String[] parts = time.split(":");
        String hour = parts[0]; // 004
        String min = parts[1]; // 034556
        String sec = parts[2]; // 034556

        //Total time (in seconds) = (3600*hour) + (60*min) + sec
        return (3600 * Integer.parseInt(hour)) + (60 * Integer.parseInt(min)) + Integer.parseInt(sec);
    }

    private int getTimeInSecondsFromPacePerKm(String pace_per_km)
    {

        String[] parts = pace_per_km.split(":");
        String min = parts[0]; // 034556
        String sec = parts[1]; // 034556

        //Total time (in seconds) = (3600*hour) + (60*min) + sec
        return (60 * Integer.parseInt(min)) + Integer.parseInt(sec);
    }
    //Round value with specific decimals
    public static String getDoubleValue(String value,int digit){
        if(value==null){
            value="0";
        }
        double i=0;
        try {
            value = value.replace(",", ".");
            DecimalFormat digitformat = new DecimalFormat("#.##");
            digitformat.setMaximumFractionDigits(digit);
            return digitformat.format(Double.parseDouble(value)).replace(",", ".");

        } catch (NumberFormatException numberFormatExp) {
            numberFormatExp.printStackTrace();
            return String.valueOf(i);
        }
    }

    private double getDistanceinMeters(double distance)
    {
        return distance * 1000;
    }

    private double getDistanceInKms(double meters)
    {
        return meters / 1000;
    }


}