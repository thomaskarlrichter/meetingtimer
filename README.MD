# Meetingstimer

## Funktionen

- jeder Teilnehmer einer Gruppe kann einen Timer starten,
  wenn kein anderer Teilnehmer gerade einen Timer laufen hat.

- der Ablauf der abgelaufenen Timer wird in einer Liste geloggt

- Man kann sich zu einem Betrag melden und wird daraufhin in eine Warteliste aufgenommen

## Admin

- der Administrator (der die Gruppe eingerichtet hat) kann die Warteliste
  editieren, umordnen löschen, Beiträge unterbrechen??


## Implementieren einer Auflistung aller users im Meetingstimer

- Research: wie können user angezeigt werden? -> Presences Package

- Wie werden User dargestellt?: Template: logged_in_users

- wie komme ich an die Namen? ist das schwerste gerade?
  - idee: Stack overflow recherchieren

  - Brauche unbedingt die meteor API-Doc local
