
import {
    Platform,
    Dimensions,
    processColor
  } from 'react-native';
  
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  if(Platform.OS === 'android') {
    var fontMain = "Brandon_bld";
    var fontText = "OpenSans-Regular";
  } else {
    // ios
    var fontMain= "OpenSans";//"BrandonGrotesque-Bold";//"MafraCondensedDeck"; //cause error in ios
    var fontText = "OpenSans";
  }
  const htmlContentUpload ='';

    const htmlContentImpress=`<h3>Paulsbad Physio-Fitness-Studio</h3><p>Ostertor 2<br />37574 Einbeck<br /><br /><strong>Vertreten durch:</strong><br />Gerhard J. Mandalka
    <br /><strong>Kontakt:</strong><br>Telefon: (0 55 61) 3 13 91 92<br>Telefax: (0 55 61) 31 33 24<br>&nbsp;<br>E-Mail: <a href="mailto: info@paulsbad.de">info@paulsbad.de</a><br><strong><br>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</strong><br>DE 226 658 862</p>`;
    const htmlContentPrivacyPolicy=`<p>Wir möchten Sie darüber informieren, dass wir für diese mobile Applikation die gesetzlichen Bestimmungen gemäß Presserecht, Bundesdatenschutzgesetz (BDSG), Telemediengesetz (TMG) und weiteren Datenschutzgesetzen beachten, da sowohl der Schutz der Privatsphäre als auch der Schutz unserer Kunden für uns von besonderer Bedeutung sind.</p><h3>Personenbezogene Daten</h3><p>Ihre personenbezogenen Daten werden nur erhoben und gespeichert, wenn Sie uns Ihre Zustimmung über einen Opt-In bei der Erstinstallation oder bei einem Update der App erteilt haben.</p><p>Personenbezogene Daten werden nicht unbefugt an Dritte weitergegeben. Eine Übermittlung von Daten in staatliche Einrichtungen und Behörden erfolgt nur im Rahmen zwingender Rechtsvorschriften. Als Nutzer haben Sie das Recht, sich entgeltlich und unverzüglich über die zu Ihrer Person erhobenen Daten und den logischen Aufbau der Datensammlung zu erkundigen (§§14, 14 TMG, §§6, 6a, 34 BDSG).</p><p>Die erforderlichen Daten werden im Bedarfsfall unter strikter Wahrung der Bestimmungen des BDSG, des TMG und weiterer datenschutzrechtlicher Gesetze von uns gespeichert und verarbeitet.</p><h3>Widerspruch</h3><p>Wenn Sie mit der Speicherung und Auswertung dieser Daten nicht einverstanden sind, können Sie der Speicherung und Nutzung per Einstellung (Opt-Out) in der App jederzeit widersprechen.</p>`;
  
  
    const APP_CONSTANTS =   {
      STORAGE_KEY : 'TOKEN',
      NO_VIDEOS: "NO_VIDEOS",
    screenX: ScreenWidth,
    screenY: ScreenHeight,
  
    apiUrl: "https://www.app-4bam.de/api",
    apiKey: "d57629ce9b5ec4e2c0b14dafc3af9056",
  
    serverUrl: "https://www.app-4bam.de",
  
    // icons
    shareIcon: "ios-share-alt",
    vistedIcon: "building", //check
    notVisitedIcon: "building-o",
    mapIcon: "map",
    noteIcon: "sticky-note",
  
    //drawerWidth
    drawerWidth: ScreenWidth*0.80,
  
    //BaseUnit
    baseUnit: 16,
  
    //colors
    colorWhite: "#ffffff",
    colorBlack: "#000000",
    colorMain: "#155aa4",
    colorActive: "#ff9900",
    colorLightGray: "#cccccc",
    colorDarkGray: "#333333",
    colorSeperatorColor: "rgba(0, 0, 0, 0.1)",
    colorDrawerIsActiveBackgroundColor: "rgba(0, 0, 0, 0.3)",
    colorDrawerSeperatorBackgroundColor: "rgba(0, 0, 0, 0.1)",
  
    //fonts
    fontMain: fontMain,
    fontSub: fontText, // not in use
    fontHeadline: fontText,
    fontText: fontText,
  
    //labels
    labelNewsList: "Nachrichten",
    labelLocationList: "Locations",
    labelNotesList: "Notes",
    labelGalleryList: "Mediathek",
    labelUpload: "Direktmelder",
    labelSettings: "Einstellungen",
    labelAccount: "Benutzerkonto",
    labelInprint: "Impressum",
    labelPrivacyPolicy: "Datenschutz",
    labelBookmarks: "Lesezeichen",
    labelEmail: "E-Mail",
    labelPhone: "Telefon-Nummer",
    labelPassword: "Passwort",
    labelTermsofuse: "Nutzungsbedingungen gelesen?",
    labelSubmit: "Absenden",
    labelNews: "News & Infos",
    labelDelete: "Löschen",
    labelCancel: "Abbrechen",
    labelHome: "Home",
    labelTimeTable: "Benachrichtigungen",
    labeleTraining: "Trainieren",
    labelPushnotifications: "Push-Nachrichten aktivieren?",
    labelFontsize: "Schriftgröße",
  
    labelLoginButton: "Anmelden",
    labelLogoutButton: "Abmelden",
    labelForgotPassword: "Passwort vergessen?",
    labelAccountUpdateButton: "speichern",

    labelSelectPhoto: "Foto auswählen",
    labelSelectSource: "Bitte wählen Sie eine Fotoquelle",
    labelFromCamera: "Kamera",
    labelFromLib: "Album",
    labelMsg: "Nachricht",
      
    //text
    textDownloadAllreadRunning: "Bitte warten Sie bis der aktuelle Download abgeschlossen ist.",
    textNoIssueSelected: "Es wurde keine Ausgabe ausgewählt",
    textDeleteIssues: "Ausgabe löschen",
    //textComfirmDeleteIssues: "Are you sure you want to delete these"+${this.state.deletedIssues.length}+"issues",
    textPushnotificationsHeadline: "Push-Nachrichten",
    textPushnotifications: "Über unsere Push-Nachrichten werden Sie direkt über neue Ereignisse informiert. Sie können diesen Service jederzeit aktivieren oder deaktiveren.",
    textFontsizeHeadline: "Nachrichten Schriftgröße",
    textFontsize: "Hier können Sie die Schriftgröße nach Ihren Bedürfnissen anpassen.",
  
    textLogin: "Anmelden",
    textLoginFollowup: "Um auf die 4BAM-App zuzugreifen, loggen Sie sich bitte mit Ihrer Benutzer-E-Mail-Adresse und Ihrem Passwort ein.",
    textLogout: "Sie sind angemeldet!",
    textLogutFollowup: "Sie können auf alle DigitalPlus-Inhalte zugreifen.",
    textErrorLogin: "Es ist ein Fehler aufgetreten. Überprüfen Sie Ihre Eingabe.",
  
    textInstantNewsHeadline: "Direktmelder",
    textInstantNews: "Etwas Spannendes ist passiert und Sie sind mittendrin? Schicken Sie unsere Redaktion direkt einen Hinweis!",
  
    textDownloadbyManager: "wird heruntergeladen.",
    textDownloadError: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
  
    htmlUpload: htmlContentUpload,
    htmlImpress: htmlContentImpress,
    htmlPrivacyPolicy: htmlContentPrivacyPolicy,

  
  }
  import store from 'react-native-simple-store';
  const getAppConstants = async (obj)=>{
    obj.baseUnit = await store.get('BASE_UNIT') || 18;
  }
  getAppConstants(APP_CONSTANTS);
  module.exports = APP_CONSTANTS;