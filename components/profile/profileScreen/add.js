import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, SafeAreaView, Modal, Alert } from "react-native";
import {db} from '../../../utlls/firebase/index'
import {ref, onValue,set } from 'firebase/database'
import { Dropdown } from 'react-native-element-dropdown';
import {useState} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";

const data_teachers = [
{value:0,label:"Аблаева Г.Р."},
{value:1,label:"Акбулатова А.А."},
{value:2,label:"Альгина Е.И."},
{value:3,label:"Асанова Л.В."},
{value:4,label:"Гайнулин Н.Н."},
{value:5,label:"Гайнулина Г.Г."},
{value:6,label:"Горюнова И.А."},
{value:7,label:"Гребенкова С.М."},
{value:8,label:"Ибрагимов Ф.З."},
{value:9,label:"Ишматова Р.Ф."},
{value:10,label:"Киреева Г.А."},
{value:11,label:"Лутфуллин У.М."},
{value:12,label:"Мадиярова С.А."},
{value:13,label:"Макарова Н.А."},
{value:14,label:"Меньшенина С.Н."},
{value:15,label:"Мустафина Н.Р."},
{value:16,label:"Поливина Д.С."},
{value:17,label:"Рязанов Н.С."},
{value:18,label:"Рязанова Г.Г."},
{value:19,label:"Сергеев А.Н."},
{value:20,label:"Станюкова Н.Е."},
{value:21,label:"Тагиров Р.М."},
{value:22,label:"Утяшева Г.Р."},
{value:23,label:"Филиппова Т.В."},
{value:24,label:"Хамитов М.М."},
{value:25,label:"Хафизова Л.С."},
{value:26,label:"Хисматуллина А.И."},
{value:27,label:"Хисматуллина Е.Р."},
{value:28,label:"Чинейкина М.Н."},
{value:29,label:"Шаранова О.С."},
{value:30,label:"Юсубалиев Р.Г."},
{value:31,label:"Янбердина Л.С."},
{value:32,label:"Яндавлетова Д.Х."}
]
const data_para = [
    { label: '1: 8:30 - 10:00', value: 0 },
    { label: '2: 10:10 - 11:40', value: 1 },
    { label: '3: 12:20 - 13:50', value: 2 },
    { label: '4: 14:00 - 15:30', value: 3 },
    { label: '5: 15:40 - 17:10', value: 4 },
    { label: '6: 17:20 - 18:50', value: 5 },
    { label: '7: 19:00 - 20:30', value: 6 },
  ];
const data_group = [
    {value:0,label:"ТОР-23"},
    {value:1,label:"РЭГ-23"},
    {value:2,label:"СЭЗС-23"},
    {value:3,label:"ПР-23"},
    {value:4,label:"ОПИ-23"},
    {value:5,label:"ДПИ-23"},
    {value:6,label:"МД-23/1"},
    {value:7,label:"МД-23/2"},
    {value:8,label:"ИСИП-23/1"},
    {value:9,label:"ИСИП-23/2"},
    {value:10,label:"БУ-23"},
    {value:11,label:"БД-23"},
    {value:12,label:"Ф-23"},
    {value:13,label:"ЗИМ-23"},
    {value:14,label:"ЮР-23/1"},
    {value:15,label:"ЮР-23/2"},
    {value:16,label:"ПКД-23"},
    {value:17,label:"ТОР-22"},
    {value:18,label:"РЭГ-22"},
    {value:19,label:"КИП-22"},
    {value:20,label:"СЭЗС-22"},
    {value:21,label:"ПР-22"},
    {value:22,label:"ОПИ-22"},
    {value:23,label:"ДПИ-22"},
    {value:24,label:"МД-22"},
    {value:25,label:"ПО-22/1"},
    {value:26,label:"ПО-22/2"},
    {value:27,label:"БУ-22"},
    {value:28,label:"БД-22"},
    {value:29,label:"Ф-22"},
    {value:30,label:"ЗИМ-22"},
    {value:31,label:"ПСО-22/1"},
    {value:32,label:"ПСО-22/2"},
    {value:33,label:"ПКД-22"},
    {value:34,label:"ТОР-21"},
    {value:35,label:"РЭГ-21"},
    {value:36,label:"КИП-21"},
    {value:37,label:"СЭЗС-21"},
    {value:38,label:"ПР-21"},
    {value:39,label:"ОПИ-21"},
    {value:40,label:"ДПИ-21"},
    {value:41,label:"МД-21"},
    {value:42,label:"ПО-21"},
    {value:43,label:"БУ-21"},
    {value:44,label:"Ф-21"},
    {value:45,label:"ЗИМ-21"},
    {value:46,label:"ПСО-21/1"},
    {value:47,label:"ПСО-21/2"},
    {value:48,label:"ПКД-21"},
    {value:49,label:"ТОР-20"},
    {value:50,label:"РЭГ-20"},
    {value:51,label:"СЭЗС-20"},
    {value:52,label:"ПР-20"},
    {value:53,label:"ОПИ-20"},
    {value:54,label:"ДПИ-20"},
    {value:55,label:"БУ-20"},
    {value:56,label:"МД-20"},
    {value:57,label:"ПО-20"},
    {value:58,label:"ПКД-20"}
]
const data_subject = [
    {value:0,label:"Математика"},
    {value:1,label:"Физика"},
    {value:2,label:"Русс. яз."},
    {value:3,label:"Литература"},
    {value:4,label:"Информатика"},
    {value:5,label:"История"},
    {value:6,label:"География"},
    {value:7,label:"ОБЖ"},
    {value:8,label:"Химия"},
    {value:9,label:"Баш. яз."},
    {value:10,label:"Ин. яз"},
    {value:11,label:"Обществознание"},
    {value:12,label:"Устройство авто"},
    {value:13,label:"Эл.машины"},
    {value:14,label:"Тех.механика"},
    {value:15,label:"Эл.техника"},
    {value:16,label:"Тех.черчение"},
    {value:17,label:"Физкультура"},
    {value:18,label:"Осн.материаловед"},
    {value:19,label:"Система охр.труда"},
    {value:20,label:"Пр.зд.и соор"},
    {value:21,label:"Материаловедение"},
    {value:22,label:"Рус.яз.и культ.речи"},
    {value:23,label:"Инженер.граф"},
    {value:24,label:"Геология"},
    {value:25,label:"Худ.проектир."},
    {value:26,label:"Охрана труда"},
    {value:27,label:"Эколог.осн.природ."},
    {value:28,label:"Живопись"},
    {value:29,label:"Осн.проектир. БД"},
    {value:30,label:"ДОУ"},
    {value:31,label:"Осн.соц.и полит."},
    {value:32,label:"Орган.расчет.опер."},
    {value:33,label:"Прав.осн."},
    {value:34,label:"Осн.бан.учета"},
    {value:35,label:"Финансы и кредит"},
    {value:36,label:"Осн.орган.функц. бюд.сист."},
    {value:37,label:"Орг.расчет с бюдж.в  бюд. сист."},
    {value:38,label:"Архитектура"},
    {value:39,label:"Менеджмент"},
    {value:40,label:"Компьют.графика"},
    {value:41,label:"Эконом.анализ"},
    {value:42,label:"БЖД"},
    {value:43,label:"Эконом.орган."},
    {value:44,label:"Теория гос.право"},
    {value:45,label:"Тех.оснащ."},
    {value:46,label:"МДК.01.01. Орган.проц."},
    {value:47,label:"МДК.01.02. Процесс пригот." },
    {value:48,label:"ПБДД"},
    {value:49,label:"Автом.и экспл.матер."},
    {value:50,label:"Информ.тех."},
    {value:51,label:"Микропроц.техника"},
    {value:52,label:"Эл.безопасность"},
    {value:53,label:"Ср-ва автомат"},
    {value:54,label:"Монтаж сист.автом."},
    {value:55,label:"Учет и контроль"},
    {value:56,label:"Осн.тех.проц."},
    {value:57,label:"Тех.добычи"},
    {value:58,label:"Механизация"},
    {value:59,label:"Эл.снабжение"},
    {value:60,label:"Технолог.проц"},
    {value:61,label:"Анализ руд"},
    {value:62,label:"Юв.дело"},
    {value:63,label:"Осн.алгоритм."},
    {value:64,label:"Комп.сеть"},
    {value:65,label:"Разработка моб.прилож."},
    {value:66,label:"Бух.техн. инвентаризации"},
    {value:67,label:"Орган.расчет с бюдж.и внебюд."},
    {value:68,label:"Осн.анализа бух.отчет."},
    {value:69,label:"Тех.сост.бух.от."},
    {value:70,label:"АФХД"},
    {value:71,label:"Осн.орган.функц. бюд."},
    {value:72,label:"Налоги и налогообложение"},
    {value:73,label:"Прав.обесп."},
    {value:74,label:"Управление"},
    {value:75,label:"Оценка недвиж.имущества"},
    {value:76,label:"Страх.дело"},
    {value:77,label:"Гражд.право"},
    {value:78,label:"Право соц.обесп."},
    {value:79,label:"Гражд.процесс"},
    {value:80,label:"Осн.философии"},
    {value:81,label:"Осн.эконом.менед."},
    {value:82,label:"МДК.03.01.Орган.приготовл."},
    {value:83,label:"Выполнен.работ"},
    {value:84,label:"Ремонт авто"},
    {value:85,label:"Тех.регулир."},
    {value:86,label:"Осн.тех.экспл."},
    {value:87,label:"ППР"},
    {value:88,label:"Экспл.зд."},
    {value:89,label:"Система управл"},
    {value:90,label:"Орган.управл."},
    {value:91,label:"УМОУП"},
    {value:92,label:"Педагогич.осн"},
    {value:93,label:"Орг.и планир"},
    {value:94,label:"Маркшейд.обеспеч"},
    {value:95,label:"Осн.учета извлеч"},
    {value:96,label:"Осн.упр.персон"},
    {value:97,label:"Приклад.програм"},
    {value:98,label:"Осн.финан.грам."},
    {value:99,label:"МДК.03.02. Проц.пригот."},
    {value:100,label:"МДК.05.01. Орг.и вед.проц.пригот"},
    {value:101,label:"Биология"},
    {value:102,label:"Тех.процесс ТО"},
    {value:103,label:"Монтаж средст.автом."},
    {value:104,label:"Средства автоматизации"},
    {value:105,label:"Общ.свед.об инжен.сетях"},
    {value:106,label:"Астрономия"},
    {value:107,label:"Топогр.геод.изыск."},
    {value:108,label:"Осн.гор.дело"},
    {value:109,label:"Разраб.програм.мод."},
    {value:110,label:"Операционные системы"},
    {value:111,label:"Осн.бух.учета"},
    {value:112,label:"Орган.кред.работы"},
    {value:113,label:"Учет кред.опер."},
    {value:114,label:"Кассов.опер."},
    {value:115,label:"Междунар.расчет."},
    {value:116,label:"Статистика"},
    {value:117,label:"Проектно-сметное дело"},
    {value:118,label:"Стилистика и культура речи"},
    {value:119,label:"Констит.право"},
    {value:120,label:"Нотариат"},
    {value:121,label:"ТО и ремонт эл. и эл.систем"},
    {value:122,label:"Слесарь по ремонту авт."},
    {value:123,label:"АСУ"},
    {value:124,label:"Орган.тех.процессов"},
    {value:125,label:"Метрология"},
    {value:126,label:"Осн.эконом."},
    {value:127,label:"Осн.уч.извлеч."},
    {value:128,label:"Пр.осн.б/у"},
    {value:129,label:"Финан.орган."},
    {value:130,label:"Осн. финан.планир."},
    {value:131,label:"Финан.экон.мех."},
    {value:132,label:"Психология общения"},
    {value:133,label:"Судеб.защита"},
    {value:134,label:"Геодезия с осн.картог."},
    {value:135,label:"Орган.раб.органов СЗН и ПФР"},
    {value:136,label:"Труд.право"},
    {value:137,label:"Гражданское процесс"},
    {value:138,label:"Правоохран.и суд.органы"},
    {value:139,label:"МДК.02.01. Орган.проц."},
    {value:140,label:"ТО авто"},
    {value:141,label:"Эл.и эл.мех.  оборуд."},
    {value:142,label:"Техн.разр.ПО"},
    {value:143,label:"МДК.06.01. Опер.управл."},
    {value:144,label:"Основы электротехники"},
    {value:145,label:"Технические измерения"},
    {value:146,label:"ДПИ и народ.пром."},
    {value:147,label:"Дискрет математ."},
    {value:148,label:"Бух.дело"},
    {value:149,label:"Бух.учет и налогообл."},
    {value:150,label:"ТТП"},
    {value:151,label:"Тех.пусконал.раб."},
    {value:152,label:"Рисунок"},
    {value:153,label:"Сист.програм."},
    {value:154,label:"Осн.предпр.деят."},
    {value:155,label:"Бух.учет"},
    {value:156,label:"Кадаст.и кадстр.ценность"},
    {value:157,label:"Организация работы ПФР"},
    {value:158,label:"МДК 02.02  Проц.пригот."},
    {value:159,label:"Орган.обслуж."},
    {value:160,label:"Пед.основы"},
    {value:161,label:"Орган.расчет с бюдж."},
    {value:162,label:"Инстр. средства разработки ПО"},
    {value:163,label:"Инфоком.сист"},
    {value:164,label:"МДК.05.02. Проц. пригот."},
    {value:165,label:"Орган.хранения"},
    {value:166,label:"Калькуляция"},
    {value:167,label:"Скульптура"},
    {value:168,label:"Основы автоматизации"},
    {value:169,label:"Технол.оборудо."},
    {value:170,label:"Проек. зданий и сооружений"},
    {value:171,label:"Осн.маркш. дела"},
    {value:172,label:"Электротехника"},
    {value:173,label:"Основы ОПИ"},
    {value:174,label:"Эл.выс.математ."},
    {value:175,label:"Психология"},
    {value:176,label:"ТО и ремонт шасси"},
    {value:177,label:"Ремонт кузова"},
    {value:178,label:"Поддержка тестирования ПМ"},
    {value:179,label:"Управл.б/у"},
    {value:180,label:"Судебная защита ЗИО"},
    {value:181,label:"Основы эколо.права"},
    {value:182,label:"Правоохр.суд.органы"},
    {value:183,label:"Экономика"},
    {value:184,label:"Тех.раз. и защиты БД"},
    {value:185,label:"Документирование и сертификация"},
    {value:186,label:"Культура питания народов мира"},
    {value:187,label:"Прак. активов орган."},
    {value:188,label:"ХПИ"},
    {value:189,label:"МДК.01.03. Тех.процесс"},
    {value:190,label:"Инстр.ср-ва" },
    {value:191,label:"Орг.деятельности"},
    {value:192,label:"Экспл.зданий и сооруж."},
    {value:193,label:"Реконструкция"},
    {value:194,label:"Осн.эконом.теории"},
    {value:195,label:"Осн.физ.химии"},
    {value:196,label:"Монтаж"},
    {value:197,label:"Пр.осн.адвокат. деят."}
]
const data_days = [
  {value:0,label:"Понедельник"},
  {value:1,label:"Вторник"},
  {value:2,label:"Среда"},
  {value:3,label:"Четверг"},
  {value:4,label:"Пятница"},
  {value:5,label:"Суббота"},
  {value:6,label:"Воскресенье"}
]
const data_week = [
  {value:0,label:"Четная неделя"},
  {value:1,label:"Нечетная неделя"},
]

let selected_group = null;
let selected_subject = null;
let selected_para = null;
let selected_teacher = null;
let selected_day = null;
let selected_week = null;
let selected_place = "";
let selected_date = null;
function click(){
   timetables = []
   onValue(ref (db, 'TimeTable/') , (snapshot) => {
    for(let i=0;i<snapshot.val().length;i++) {
      timetables.push( snapshot.val()[i])
      
   }
});
extraTimeTable = []
   onValue(ref (db, 'extraTimeTable/') , (snapshot) => {
    for(let i=0;i<snapshot.val().length;i++) {
      extraTimeTable.push( snapshot.val()[i])
      
   }
});
  if(selected_group!=null&& selected_para!=null&& selected_place!=""&& selected_subject!=null&& selected_teacher!=null&&selected_day!=null && selected_week!=null ){
  let startTime ="";
  let endTime ="";
  if(selected_para == 0){
      startTime="8:30"
      endTime="10:10"

  }
  if(selected_para == 1){
    startTime="10:10"
    endTime="11:40"
  }
  if(selected_para == 2){
    startTime="12:20"
    endTime="13:50"
  }
  if(selected_para == 3){
    startTime="14:00"
    endTime="15:30"
  }
  if(selected_para == 4){
    startTime="15:40"
    endTime="17:10"
  }
  if(selected_para == 5){
    startTime="17:20"
    endTime="18:50"
  }
  if(selected_para == 6){
    startTime="19:00"
    endTime="20:30"
  }

    set(ref(db, 'extraTimeTable/' + extraTimeTable.length), {
    group: selected_group,
    subject: selected_subject,
    placeinday : (selected_para+1),
    place: selected_place,
    teacher:selected_teacher,
    starttime:startTime,
    endtime:endTime,
    week:selected_week,
    day:selected_day,
    id:extraTimeTable.length,
    date: selected_date
   });
   Alert.alert('Добавление пары',
    `Вы добавили пару на ${selected_date}` ,[
    {
      text: 'ОК'
    }
   ])
    console.log(`да `)
   
}

}

const DropdownParaComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_para}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите время"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_para = item.value
        }}
        renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          )}
        renderItem={renderItem}
      />
    );
  };
  const DropdownGroupComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_group}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите группу"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_group = item.value
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };
  const DropdownSubjectComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_subject}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите предмет"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_subject = item.value
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };
  const DropdownTeacherComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_teachers}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите преподавателя"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_teacher = item.value
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };
  const DropdowndayComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_days}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите день"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_day = item.value
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };
  const DropdownweekComponent = () => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data_week}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Выберите неделю"
        searchPlaceholder="Поиск..."
        value={value}
        onChange={item => {
          setValue(item.value);
          selected_week = item.value
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />
    );
  };


  
export default function AddLeon(){
const [open,setOpen] = useState(false);
const [date,setDate] = useState(false);
const today = new Date();
const startDate = getFormatedDate(today.setDate(today.getDate()+1,'YYYY/MM/DD'))
function handleOnPress(){
  setOpen(!open)
}
function handleChange(propDate){
  setDate(propDate)
  selected_date = propDate
  console.log(propDate)
}
    return (
        <SafeAreaView className="w-full h-full">
             <Image 
                blurRadius={70} 
                source={require('../../../assets/backgrounds/bg.jpg')} 
                className="absolute w-full h-full" />
                <View className="h-2/4 w-full">
                    <DropdownGroupComponent/>
                    <DropdownSubjectComponent/>
                     <DropdownParaComponent/>
                    <DropdownTeacherComponent/>
                    <DropdowndayComponent/>
                    <DropdownweekComponent/>
                    <TouchableOpacity className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(3),justifyContent:'center',borderColor:'white'}}onPress={handleOnPress }>
                      <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                        Выберите дату
                      </Text>
                    </TouchableOpacity>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={open}>
                      <View className="flex-1 justifyContent-center" >
          <View style={{
             margin: 40,
             backgroundColor: 'white',
             borderRadius: 20,
             alignItems: 'center',
             shadowColor: '#000',
             shadowOffset: {
               width: 0,
               height: 2,
             },
             shadowOpacity: 0.25,
             shadowRadius: 4,
             elevation: 5
          }}>
            <DatePicker 
            mode = 'calendar'
            selected={date}
            minimumDate={startDate}
            onDateChange={handleChange}
            />
            <TouchableOpacity onPress={handleOnPress}>
              <Text>
                Закрыть
              </Text>
            </TouchableOpacity>
            </View>
            </View>

                    </Modal>
                    <TextInput className="w-3/4 border-2 rounded-full"
                    style={{height:wp(15),justifyContent:'center',alignSelf:'center', borderColor:'white',paddingHorizontal:wp(10)}}
                    onChangeText={(text) =>{
                        selected_place = text;
                     }}
                     />
                    {/* кнопка добавления*/}
                    <TouchableOpacity className="w-3/4  border-2 rounded-full"
                    style={{height:wp(15),alignSelf:'center',margin:wp(10),justifyContent:'center',borderColor:'white'}}
                    onPress={()=>click()}>
                        <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:wp(7),color:'white'}}>
                            ОК
                        </Text>
                    </TouchableOpacity>
                </View>
            

        </SafeAreaView>
    )

}


 

  const styles = StyleSheet.create({
    
    dropdown: {
      margin: 8,
      height: 50,
      borderRadius: 12,
      borderColor:'white',
      borderWidth:2,
      padding: 12,      
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

    },
    icon: {
    color:'white',
    marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
        color:'white',
      fontSize: 16,
    },
    selectedTextStyle: {
        color:'white',
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });